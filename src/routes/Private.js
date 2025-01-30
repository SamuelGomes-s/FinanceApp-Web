import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { Navigate } from "react-router-dom"
import Loading from "../../src/components/Loader"

export default function Private({ children, redirectTo = "/", invert = false }) {
    const { signed, loadingUser } = useContext(AuthContext);

    if (loadingUser) {
        return (
            <div
                style={{
                    backgroundColor: "#A3A3A3",
                    height: "100vh",
                    width: "100vw",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <Loading />
            </div>
        );
    }

    if (!invert && !signed) {
        return <Navigate to={redirectTo} />;
    }

    if (invert && signed) {
        return <Navigate to={redirectTo} />;
    }

    return children;
}
