import { createContext, useEffect, useState } from "react";
import { auth } from "../services/firebase/firebaseConnection"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {

    const [user, setUser] = useState(null)
    const [loadingUser, setLoadingUser] = useState(true)
    const [loadingAuth, setLoadingAuth] = useState(false)

    useEffect(() => {
        const unSub = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    name: user?.displayName,
                    uid: user?.uid,
                    email: user?.email
                });
                setLoadingUser(false)
            } else {
                setUser(null);
                setLoadingUser(false)
            }
        });
        return () => unSub();
    }, [])

    async function handleSignIn(data) {
        try {
            const userResponse = await signInWithEmailAndPassword(auth, data.email, data.password)
            console.log({
                uid: userResponse.user?.uid,
                name: userResponse.user?.displayName,
                email: userResponse.user?.email
            })
            setUser({
                uid: userResponse.user?.uid,
                name: userResponse.user?.displayName,
                email: userResponse.user?.email
            })
            toast.success("Login realizado com sucesso.")
            setLoadingAuth(false)
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
            setLoadingAuth(false)
        }
    }

    async function handleSignUp(data) {
        try {
            const userResponse = await createUserWithEmailAndPassword(auth, data?.email, data?.password)
            await updateProfile(userResponse.user, {
                displayName: data?.name
            })
            let u = userResponse.user
            setUser(
                {
                    uid: u.uid,
                    name: u.displayName,
                    email: u.email
                }
            )
            setLoadingAuth(false)
            toast.success("Usuario criado com sucesso.")
        } catch (error) {
            console.log(error.message)
            setLoadingAuth(false)
            toast.error(error.message)
        }
    }

    async function LogOut() {
        try {
            signOut(auth)
            toast.success('Deslogado com sucesso')
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }
    }
    return (
        <AuthContext.Provider
            value={{
                signed: !!user,
                handleSignIn,
                handleSignUp,
                loadingAuth,
                setLoadingAuth,
                loadingUser,
                LogOut
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}