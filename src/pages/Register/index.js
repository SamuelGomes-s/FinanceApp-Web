import { Input } from "../../components/Input";
import { Container, FinanceRegForm, LabelStyled, OptionStyled, SelectStyled, TextAreaReg, Title } from "./styles";
import { SubmitBtn } from "../../components/SubmitBtn/index"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { auth, db } from "../../services/firebase/firebaseConnection"
import { AuthContext } from "../../contexts/AuthContext"
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import Loading from "../../components/Loader";
import { useNavigate, useParams } from "react-router-dom";

const schema = z.object({
    name: z.string().nonempty('O nome da movimentação deve ser preenchido ex: Conta de energia...').min(3, 'O nome da movimentação deve ser pelo menos 3 letras...'),
    value: z.coerce.number()
        .min(1, { message: 'O valor deve ser maior que 0' })
        .nonnegative({ message: 'O valor não pode ser negativo' }),
    description: z.string().optional(),
    type: z.enum(['receive', 'cost'], { message: 'Selecione um tipo de movimentação válido' })
})

export default function Register() {
    
    const { user } = useContext(AuthContext)
    const [title, setTitle] = useState('Cadastro de movimentação')
    const [msg, setMsg] = useState('Cadastrar')
    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()
    const methods = useForm({
        shouldUnregister: true,
        resolver: zodResolver(schema),
        mode: 'onChange'
    })
    const { handleSubmit, reset, register } = methods;

    useEffect(() => {
        if (id) {
            loadReg()
        } else {
            reset()
        }
    }, [id])

    async function loadReg() {
        setLoading(true)
        try {
            if (!id) {
                return
            }
            const docRef = doc(db, 'finances', id)
            const docSnap = await getDoc(docRef)
            if (!docSnap.exists()) {
                toast.warn(`Não possui um registro com o id: ${id}`)
                toast.warn('Redirecionando para a tela de novo registro.')
                navigate('/register')
            }
            reset(
                docSnap.data()
            )
            setTitle(`Editando movimentação: ${id}`)
            setMsg('Atualizar')
            setLoading(false)
        } catch (error) {
            toast.error(error.message)
            setLoading(false)
        }
    }

    async function handleAdd(data) {
        setLoading(true)
        try {
            const { name, value, description, type } = data
            let newDoc = {
                name,
                value,
                description: description || null,
                type,
                owner: user?.name,
                uid: user?.uid,
                updateAt: new Date()
            }
            if (id) {
                const docRef = doc(db, 'finances', id)
                await setDoc(docRef, newDoc, { merge: true })
                toast.success('Registro atualizado com sucesso.')
                const nav = window.confirm("Deseja ser redirecionado para a pagina home?")
                if (nav) {
                    navigate('/home')
                }
            } else {
                const response = await addDoc(collection(db, 'finances'), {
                    ...newDoc,
                    createdAt: new Date()
                })
                await handleBalance(data)
                toast.success(`Registro ${response.id} criado com sucesso`)
                reset()
            }
            setLoading(false)
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
            setLoading(false)
        }
    }

    async function handleBalance(data) {
        try {
            const { type, value } = data
            const currentUser = auth.currentUser
            if (!currentUser) {
                toast.error("Usuario não está logado.")
                return
            }
            const docRef = doc(db, 'balance', currentUser.uid)
            const get = await getDoc(docRef)
            let newBalance = value
            if (get.exists()) {
                let balance = get.data()?.balance || 0
                newBalance = type === "receive" ? balance + value : balance - value
                const responseUpdate = await setDoc(docRef, {
                    updatedAt: new Date(),
                    balance: newBalance
                }, { merge: true })
                return
            }
            const responseNew = await setDoc(docRef, {
                balance: newBalance || 0,
                createdAt: new Date(),
                updatedAt: new Date()
            })
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    return (
        <Container>
            <Title>{title}</Title>
            <FormProvider {...methods} >
                <FinanceRegForm onSubmit={handleSubmit(handleAdd)}>
                    <LabelStyled>Nome:</LabelStyled>
                    <Input type='text' placeholder='Digite o nome da movimentação' name='name' />
                    <LabelStyled>Descrição:</LabelStyled>
                    <TextAreaReg maxLength={250} placeholder='Digite a descrição da movimentação (opcional)' {...register('description')} />
                    <LabelStyled>Valor:</LabelStyled>
                    <Input type='number' placeholder='Digite o valor da movimentação' name='value' />
                    <LabelStyled>Tipo de movimentação:</LabelStyled>
                    <SelectStyled {...register('type')}>
                        <OptionStyled value={'receive'}>Receita</OptionStyled>
                        <OptionStyled value={'cost'}>Despesa</OptionStyled>
                    </SelectStyled>
                    <SubmitBtn>{loading ? <Loading /> : msg}</SubmitBtn>
                </FinanceRegForm>
            </FormProvider>
        </Container>
    )
}