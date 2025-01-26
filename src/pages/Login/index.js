import { useState } from "react";
import { Input } from "../../components/Input";
import { SubmitBtn } from "../../components/SubmitBtn";
import { Container, Content, LinkBtn, LoginForm } from "./styles";
import { GiGoldBar } from "react-icons/gi";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
const schema = z.object({
    name: '',
    email: '',
    password: ''
})
export default function Login() {
    const { register, reset, handleSubmit, } = useForm({
        resolver: zodResolver(schema)
    });
    const [isLogin, setIsLogin] = useState(true)

    return (
        <Container>
            <Content>
            <GiGoldBar size={120} color={'rgba(255,200,50)'}/>
                <LoginForm>
                    {!isLogin && (<Input
                        type='text'
                        placeholder={"Digite seu nome"}
                        name='name'
                        register={register}
                    />)}
                    <Input
                        type='text'
                        placeholder={"Digite seu email"}
                        name='email'
                        register={register}
                    />
                    <Input
                        type='password'
                        placeholder={"Digite sua senha"}
                        name='password'
                        register={register}
                    />
                    <SubmitBtn>
                        {isLogin ? "Acessar" : "Cadastrar"}
                    </SubmitBtn>
                </LoginForm>
                <LinkBtn onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? "Criar uma nova conta!" : "Entrar com uma conta existente."}
                </LinkBtn>
            </Content>
        </Container>
    )
}