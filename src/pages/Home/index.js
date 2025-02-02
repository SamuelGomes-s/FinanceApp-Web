import { useEffect, useState } from "react";
import Banner from "./components/banner";
import Card from "./components/card";
import { auth, db } from "../../services/firebase/firebaseConnection"
import { collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";
import { toast } from "react-toastify";
import { BannersContainer, CardsContainer } from "./styles";
import Loading from "../../components/Loader";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

export default function Home() {
    const navigate = useNavigate()
    const [cost, setCost] = useState(0)
    const [receive, setReceive] = useState(0)
    const [balance, setBalance] = useState(0)
    const [finances, setFinances] = useState([])
    const [loading, setLoading] = useState(true)
    const [loadingDelete, setLoadingDelete] = useState(false)

    useEffect(() => {
        balanceData()
    }, [auth.currentUser])

    async function balanceData() {
        try {
            const currentUser = auth.currentUser
            if (!currentUser) {
                toast.error('Não possui usuario logado')
                return
            }
            const balanceRef = doc(db, 'balance', currentUser.uid)
            const balanceResponse = await getDoc(balanceRef)
            if (!balanceResponse.exists()) {
                console.log('Documento de saldo não encontrado')
                setLoading(false)
                return
            }
            setBalance(balanceResponse.data()?.balance)
            const startOfDay = new Date()
            startOfDay.setHours(0, 0, 0, 0)
            const endOfDay = new Date()
            endOfDay.setHours(23, 59, 59, 999)
            const financesRef = collection(db, 'finances')
            const q = query(financesRef, where('uid', '==', currentUser?.uid), where('createdAt', '>=', startOfDay), where('createdAt', '<=', endOfDay))
            const querySnapshot = await getDocs(q)
            let info = []
            let totalReceive = 0
            let totalCost = 0
            querySnapshot.forEach(item => {
                let regData = item.data()
                // console.log(regData?.createdAt)
                let time = regData?.createdAt.toDate()
                let formated = format(new Date(time), 'dd/MM/yyyy')
                console.log(formated)
                info.push({
                    id: item.id,
                    createdAt: formated,
                    description: regData?.description,
                    name: regData?.name,
                    owner: regData?.owner,
                    type: regData?.type,
                    uid: regData?.uid,
                    value: regData?.value
                })
                if (regData.type === 'receive') {
                    totalReceive += regData.value
                } else if (regData.type === 'cost') {
                    totalCost += regData.value
                }
            })
            setFinances(info)
            setCost(totalCost)
            setReceive(totalReceive)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    async function handleFinanceDelete(data) {
        setLoadingDelete(true)
        try {
            const currentUser = auth.currentUser
            if (!currentUser) {
                toast.error('Não possui usuario logado')
                return
            }
            let newValue = balance;
            if (data.type === 'cost') {
                setCost(prev => prev - data.value);
                newValue += data.value;
            } else if (data.type === 'receive') {
                setReceive(prev => prev - data.value);
                newValue -= data.value;
            }
            setBalance(newValue);
            const financeRef = doc(db, 'finances', data.id)
            const balanceRef = doc(db, 'balance', currentUser.uid)
            const responses = await Promise.all([
                deleteDoc(financeRef),
                updateDoc(balanceRef, {
                    balance: newValue,
                    updateAt: new Date()
                })
            ])
            setFinances(prevFinances => prevFinances.filter(item => item.id !== data.id));
            toast.success('Registro deletado com sucesso.')
            setLoadingDelete(false)
        } catch (error) {
            console.log(error.message)
            setLoadingDelete(false)
        }
    }

    async function handleFinanceEdit(id) {
        navigate(`/register/${id}`)
    }

    if (loading) {
        return (<div
            style={{
                backgroundColor: "#A3A3A3",
                height: "100vh",
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
            <Loading />
        </div>)
    }

    return (
        <div>
            <BannersContainer>
                <Banner color={"#3b3dbf"} type={'Saldo disponivel'} value={balance} />
                <Banner color={" #00b94a"} type={'Receitas do dia'} value={receive} />
                <Banner color={'#EF463A'} type={'Despesas do dia'} value={cost} />
            </BannersContainer>
            <CardsContainer>
                {finances.map(item => (<Card key={item.id} data={item} deleteItem={handleFinanceDelete} editItem={handleFinanceEdit} loader={loadingDelete} />))}
            </CardsContainer>
        </div>
    )
}
