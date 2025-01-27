import styled from "styled-components"

export function SubmitBtn({ disabled, children }) {
    return (
        <Button type="submit" disabled={disabled} >
            {children}
        </Button>
    )
}

const Button = styled.button`
    height: 45px;
    background-color: #3b3dbf;
    display: flex;
    align-items:center;
    justify-content: center;
    color:#ffffff;
    font-size: 18px;
    font-weight: bold;
    border: 0;
    border-radius: 8px;
    transition: ease-in-out 0.5s;
    cursor: pointer;
    &:hover{
        background-color: #6567dd;
    };
    &:active{
    transform: scale(0.95);
    box-shadow: 6px 6px 6px  #171717;
    background-color: #3b3dbf;
    };
    &:disabled{
        background-color: #DDD;
        color: #000;
        cursor: not-allowed;
    }
`;
