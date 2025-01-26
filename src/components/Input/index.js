import styled from "styled-components"

export function Input({ name, register, ...props }) {

    return (
        <Content>
            <InputStyled
                {...props}
                {...register(name)}
            />
        </Content>
    )
}

const Content = styled.div`    
`;

const InputStyled = styled.input`
    width: 500px;
    border: 1px solid #171717;
    box-shadow: 2px 2px 2px  #171717;
    outline: 0;
    margin: 0.5em 0;
    height: 45px;
    padding: 0 0.7em;
    border-radius: 8px;
`;