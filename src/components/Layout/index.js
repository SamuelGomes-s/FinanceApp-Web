import { Outlet } from "react-router-dom";
import { Container } from "./styles";
import Header from "../Header";


export default function Layout() {
    return (
        <Container>
            <Header/>
            <Outlet/>
        </Container>
    )
}