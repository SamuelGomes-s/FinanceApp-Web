import styled from "styled-components"
import { Link } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { TbCashRegister } from "react-icons/tb";
export default function Header() {
    return (
        <Container>
            <LinkStyled to={'/home'}>
                <Svg>
                    <IoHomeOutline size={20} />
                </Svg>
                Home
            </LinkStyled>
            <LinkStyled to={'/register'}>
                <Svg>
                    <TbCashRegister size={20} />
                </Svg>
                Registro
            </LinkStyled>
            <LinkStyled to={'/profile'}>
                <Svg>
                    <CgProfile size={20} />
                </Svg>
                Perfil
            </LinkStyled>
        </Container>
    )
}

const Container = styled.div`
    background-color:#0F172A;
    width: 120px;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    gap: 5px;
    @media screen and (max-width: 700px) {
        max-height: 50px;
        width: 100%;
        flex-direction: row;
        justify-content: flex-start;
        gap: 10px;
    }
`;

const LinkStyled = styled(Link)`
    background-color: #2B2D42;
    text-decoration: none;
    color: #E0E5F8 ;
    transition: all 0.5s;
    padding: 0.5em;
    display:flex;
    justify-content: space-around;
    align-items: center;
    &:hover{
        text-decoration: underline;
        background-color:rgba(43, 45, 66, 0.55);
    }
    @media screen and (max-width: 700px) {
        width: 80px;
    }
`;

const Svg = styled.div`
    @media screen and (max-width: 700px) {
        display: none;
    }
`;
