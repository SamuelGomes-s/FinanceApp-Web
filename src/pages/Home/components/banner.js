import styled from "styled-components"

export default function Banner({ color, type, value }) {
    let newValue;
    if (value < 0) {
        newValue = `- R$ ${Math.abs(value)} `
    } else {
        newValue = `R$ ${value} `
    }
    return (
        <Container $bg={color}>
            <Title> {type}</Title>
            <Value>{newValue}</Value>
        </Container>
    )
}

const Container = styled.div`
    height: 200px;
    width: 100%;
    min-width: 250px;
    position: relative;
    background-color: ${props => props.$bg};
    /* margin-left: 15px; */
    border-radius: 8px;
    justify-content: center;
    align-items: center;
    display:flex;
    flex-direction: column;
`;

const Title = styled.div`
    font-size: 35px;
    text-align: center;
    position: absolute;
    color: #fff;
    top: 10px;
`;
const Value = styled.span`
    color: #fff;
    font-size: 30px;

`