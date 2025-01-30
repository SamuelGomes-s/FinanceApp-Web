import { useContext, useEffect, useState } from "react";
import { Button, Container, Content, ProfileInput, Title } from "./styles";
import { AuthContext } from "../../contexts/AuthContext"
import { toast } from "react-toastify";
import { updateProfile } from "firebase/auth";
import { auth } from "../../services/firebase/firebaseConnection";

export default function Profile() {
    const { user, setUser } = useContext(AuthContext)
    const [name, setName] = useState(user?.name || '')
    const [email, setEmail] = useState(user?.email || '')

    useEffect(() => {
        setName(user?.name)
        setEmail(user?.email)
    }, [user])

    async function handleNameUpdate(e) {
        e.preventDefault()
        if (email === user?.email) {
            if (user.name === name) {
                toast.warn("Não houve alterações no nome.")
                return
            }
            if (!name.trim()) {
                toast.warn("O nome não pode ficar em branco.")
                return
            }
            try {
                const currentUser = auth.currentUser
                if (currentUser) {
                    const response = await updateProfile(currentUser, {
                        displayName: name,
                    })
                    setUser(prevUser => ({ ...prevUser, name }))
                    toast.success("Nome alterado com sucesso.")
                } else {
                    toast.error("Usuario não está autenticado.")
                }
            } catch (error) {
                console.log(error.message)
                toast.error(error.message)
            }
        }
    }

    return (
        <Container>
            <Content>
                <Title>Atualizando nome de perfil</Title>
                <ProfileInput
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <ProfileInput
                    type="text"
                    disabled
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button onClick={handleNameUpdate} >Atualizar</Button>
            </Content>
        </Container>
    )
}