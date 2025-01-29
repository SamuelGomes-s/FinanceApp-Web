import styled from "styled-components";

const Container = styled.div`
    background-color:  #F0F4FF;
    height: 100vh;
    min-height: 100vh;
    width: 100%;
    display:flex;
    flex-direction: row;
    @media screen and (max-width: 700px) {
    flex-direction: column;
    }
`;

export {
    Container
}