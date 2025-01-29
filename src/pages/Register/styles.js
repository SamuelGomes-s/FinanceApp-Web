import styled from "styled-components";

const Container = styled.div`
    /* margin-left: 120px; */
    width: 100%;
    padding: 1.2em;
    @media screen and (max-width: 700px) {
        margin-left: 0;
    }
`;

const FinanceRegForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width:500px;
    @media screen and (max-width: 700px) {
        width: 80%;
    }
`;

const TextAreaReg = styled.textarea`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width:500px;
    height: 120px;
    resize: none;
    border: 1px solid #171717;
    box-shadow: 2px 2px 2px #171717;
    outline: 0;
    margin: 0.5em 0;
    padding: 0.7em;
    border-radius: 8px;
    @media screen and (max-width: 700px) {
        width: 100%;
    }
`;

const LabelStyled = styled.label`
    font-size: 20px;
    margin: 10px 0;
    font-weight: 600;
    color: #0F172A;
    user-select: none;
`;

const Title = styled.span`
    font-size: 30px;
    font-weight: bold;
    font-style: italic;
    color:#2B2D42;
    user-select: none;
`;

const SelectStyled = styled.select`
    width: 100%;  
    border: 1px solid #171717;
    box-shadow: 2px 2px 2px #171717;
    outline: 0;
    margin: 0.5em 0;
    height: 45px;
    padding: 0 0.7em;
    border-radius: 8px;
    margin-bottom: 15px;
    cursor: pointer; 
`;

const OptionStyled = styled.option`
    padding: 0.7em;
    color: #2B2D42;
    cursor: pointer;
    &:hover {
        background-color: #F0F4FF;
    }
`;


export {
    Container,
    FinanceRegForm,
    TextAreaReg,
    LabelStyled,
    SelectStyled,
    OptionStyled,
    Title
}