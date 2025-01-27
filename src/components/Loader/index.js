import styled, { keyframes } from "styled-components";

export default function Loading() {
    return <Loader />;
}

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const Loader = styled.div`
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: ${spin} 1s linear infinite;
`;

