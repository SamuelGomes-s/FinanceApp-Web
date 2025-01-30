import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    padding: 1.2em;
    @media screen and (max-width: 700px) {
        margin-left: 0;
    }
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width:500px;
    @media screen and (max-width: 700px) {
        width: 80%;
    }
`;

const ProfileInput = styled.input`
    width: 100%;  
    border: 1px solid #171717;
    box-shadow: 2px 2px 2px #171717;
    outline: 0;
    margin: 0.5em 0;
    height: 45px;
    padding: 0 0.7em;
    border-radius: 8px;
    &:disabled{
        background-color:rgba(214, 214, 214, 0.4);
        cursor: not-allowed;
        color:rgb(146, 146, 146);
        user-select: none;
    }
`;

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

const Title = styled.h2`
    padding: 1.5em 0;
    font-size: 30px;
    font-weight: bold;
    font-style: italic;
    color:#2B2D42;
    user-select: none;
`;

export {
    Container,
    Content,
    ProfileInput,
    Title,
    Button
}