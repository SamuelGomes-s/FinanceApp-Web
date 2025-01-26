import { Outlet } from "react-router-dom";
import { Container } from "./styles";


export default function Layout() {
    return (
        <Container>
            <Outlet/>
        </Container>
    )
}