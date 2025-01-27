import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../../components/Input";
import { SubmitBtn } from "../../components/SubmitBtn";
import { Container, Content, LinkBtn, LoginForm } from "./styles";
import { GiGoldBar } from "react-icons/gi";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Loading from "../../components/Loader";

export default function Login() {
    const { handleSignIn, handleSignUp, loadingAuth, setLoadingAuth } = useContext(AuthContext);
    const [isLogin, setIsLogin] = useState(true);

    const schema = z.object({
        name: !isLogin ? z.string().nonempty('Insira um nome válido').min(3, "O nome deve possuir no mínimo 3 caracteres") : z.string().optional(),
        email: z.string().email('Insira um e-mail válido').nonempty("O campo e-mail é obrigatório"),
        password: z.string().nonempty("O campo senha é obrigatório").min(6, "A senha deve possuir no mínimo 6 caracteres")
    });

    const methods = useForm({
        shouldUnregister: true,
        resolver: zodResolver(schema),
        mode: 'onChange'
    });

    const { handleSubmit, reset } = methods;
    function toglleTypeLogin() {
        setIsLogin(!isLogin)
        reset()
    }
    async function onSubmit(data) {
        setLoadingAuth(true)
        if (isLogin) {
            await handleSignIn(data);
            return;
        }
        await handleSignUp(data);
    }

    return (
        <Container>
            <Content>
                <GiGoldBar size={120} color={'rgba(255,200,50)'} />
                <FormProvider {...methods}>
                    <LoginForm onSubmit={handleSubmit(onSubmit)}>
                        {!isLogin && <Input type="text" placeholder="Digite seu nome" name="name" />}
                        <Input type="text" placeholder="Digite seu email" name="email" />
                        <Input type="password" placeholder="Digite sua senha" name="password" />
                        <SubmitBtn disabled={loadingAuth}>
                            {loadingAuth && <Loading />}
                            {isLogin && !loadingAuth && ("Acessar")}
                            {!isLogin && !loadingAuth && ("Cadastrar")}</SubmitBtn>
                    </LoginForm>
                </FormProvider>
                <LinkBtn onClick={toglleTypeLogin} disabled={loadingAuth}>
                    {isLogin ? "Criar uma nova conta!" : "Entrar com uma conta existente."}
                </LinkBtn>
            </Content>
        </Container>
    );
}
