import styled from "styled-components";


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

export {
    BannersContainer,
    CardsContainer
}