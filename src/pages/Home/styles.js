import styled from "styled-components";

const Container = styled.div`
    margin: 0 auto;
    padding-bottom: 0.7em;
    @media screen and (max-width: 700px) {
        margin: 0;
    }
`;

const BannersContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    max-width: 1000px;  
    width: 100%;
    padding: 20px;
    margin: 0 auto;  
    @media screen and (max-width: 950px) {
        grid-template-columns: repeat(2, minmax(250px, 1fr));  
    }
    @media screen and (max-width: 700px) {
        grid-template-columns: 1fr;  
    }
`;

const CardsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, minmax(250px, 1fr));
    gap: 20px;
    max-width: 1400px;  
    width: 100%;
    padding: 20px;
    margin: 0 auto;  
    @media screen and (max-width: 1450px){
        grid-template-columns: repeat(3, minmax(250px, 1fr));  
        
    }
    @media screen and (max-width: 1000px) {
        grid-template-columns: repeat(2, minmax(250px, 1fr));  
    }
    @media screen and (max-width: 780px) {
        grid-template-columns: 1fr;  
    }
`;

const FilterContainer = styled.div`
        background-color:rgba(43, 45, 66, 0.55);
        width: 90%;
        height: 40px;
        border-radius: 8px;
        justify-content: center;
        align-items: center;
        display: flex;
        margin: auto;
        gap: 5px;
`;

const Filter = styled.button`
    background-color:#3b3dbf;
    cursor: pointer;
    border:  0;
    border-radius: 8px;
    text-decoration: none;
    color: #E0E5F8 ;
    transition: all 0.5s;
    padding: 0.6em;
    &:hover{
        text-decoration: underline;
        background-color:rgb(0, 21, 255);
    }
    @media screen and (max-width: 700px) {
        width: auto;
        padding: 0.5em  0.6em;
    }
`;

export {
    BannersContainer,
    CardsContainer,
    FilterContainer,
    Filter,
    Container
}