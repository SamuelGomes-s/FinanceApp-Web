import styled from "styled-components";

const Container = styled.div`
    max-width: 1200px;
    min-height: 800px;
    position: fixed;
    top:25%;
    left: 0;
    right: 0;
    margin: 0 auto;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 500px;
`;


const LinkBtn = styled.a`
    margin-top:1.5em;
    user-select: none;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    color:rgb(63, 63, 63);
    cursor: pointer;
    transition: all 0.5s;
    &:hover{
        transform: scale(1.03);
        color: #000;
    };
    &:disabled{
        cursor: not-allowed;
    }
`;

export {
    Container,
    Content,
    LoginForm,
    LinkBtn
}