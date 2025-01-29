import { useFormContext } from "react-hook-form";
import styled from "styled-components";

export function Input({ name, ...props }) {
    const methods = useFormContext();
    const { register, formState: { errors } } = methods;

    return (
        <Content>
            <InputStyled {...props} {...register(name)} />
            {errors[name] && <Error>{errors[name].message}</Error>}
        </Content>
    );
}

const Content = styled.div`
    display: flex;
    flex-direction: column;
`;

const InputStyled = styled.input`
    width: 100%;  
    border: 1px solid #171717;
    box-shadow: 2px 2px 2px #171717;
    outline: 0;
    margin: 0.5em 0;
    height: 45px;
    padding: 0 0.7em;
    border-radius: 8px;
`;

const Error = styled.span`
    color: #f00;
    padding: 5px 0;
`;
