import { Input } from "../../components/Input";
import { Container, FinanceRegForm, LabelStyled, OptionStyled, SelectStyled, TextAreaReg, Title } from "./styles";
import { SubmitBtn } from "../../components/SubmitBtn/index"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react";

const schema = z.object({
    name: z.string()
})

export default function Register() {
    const methods = useForm({
        shouldUnregister: true,
        resolver: zodResolver(schema),
        mode: 'onChange'
    });
    const { handleSubmit, reset } = methods;
    useEffect(() => {
        reset()
    }, [])
    return (
        <Container>
            <Title>Regitrar movimentação</Title>
            <FormProvider {...methods} >
                <FinanceRegForm>
                    <LabelStyled>Nome:</LabelStyled>
                    <Input type='text' placeholder='Digite o nome da movimentação' name='nameReg' />
                    <LabelStyled>Descrição:</LabelStyled>
                    <TextAreaReg placeholder='Digite a descrição da movimentação (opcional)'></TextAreaReg>
                    <LabelStyled>Valor:</LabelStyled>
                    <Input type='text' placeholder='Digite o valor da movimentação' name='nameReg' />
                    <LabelStyled>Tipo de movimentação:</LabelStyled>
                    <SelectStyled>
                        <OptionStyled>Receita</OptionStyled>
                        <OptionStyled>Despesa</OptionStyled>
                    </SelectStyled>
                    <SubmitBtn>Registrar</SubmitBtn>
                </FinanceRegForm>
            </FormProvider>
        </Container>
    )
}