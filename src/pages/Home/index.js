import { useEffect, useState } from "react";
import Banner from "./components/banner";
import Card from "./components/card";
import { auth, db } from "../../services/firebase/firebaseConnection"
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { toast } from "react-toastify";
import { BannersContainer, CardsContainer } from "./styles";
export default function Home() {
    const [cost, setCost] = useState(0)
    const [receive, setReceive] = useState(0)
    const [balance, setBalance] = useState(0)
    const [finances, setFinances] = useState([])
    useEffect(() => {
        balanceData()


    }, [])

    async function balanceData() {
        try {
            const currentUser = auth.currentUser
            if (!currentUser) {
                toast.error('Não possui usuario logado')
                return
            }
            const balanceRef = doc(db, 'balance', currentUser.uid)
            const balanceResponse = await getDoc(balanceRef)
            if (!balanceResponse.exists()) {
                console.log('Documento de saldo não encontrado')
                return
            }
            setBalance(balanceResponse.data()?.balance)
            const startOfDay = new Date()
            startOfDay.setHours(0, 0, 0, 0)
            const endOfDay = new Date()
            endOfDay.setHours(23, 59, 59, 999)
            const financesRef = collection(db, 'finances')
            const q = query(financesRef, where('uid', '==', currentUser?.uid), where('createdAt', '>=', startOfDay), where('createdAt', '<=', endOfDay))
            const querySnapshot = await getDocs(q)
            let info = []
            let totalReceive = 0
            let totalCost = 0
            querySnapshot.forEach(item => {
                let regData = item.data()
                info.push({
                    id: item.id,
                    createdAt: regData?.createdAt,
                    description: regData?.description,
                    name: regData?.name,
                    owner: regData?.owner,
                    type: regData?.type,
                    uid: regData?.uid,
                    value: regData?.value
                })
                if (regData.type == 'receive') {
                    totalReceive += regData.value
                } else if (regData.type == 'cost') {
                    totalCost += regData.value
                }
                setFinances(info)
                setCost(totalCost)
                setReceive(totalReceive)
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <BannersContainer>                <Banner color={"#3b3dbf"} type={'Saldo disponivel'} value={balance} />
                <Banner color={" #00b94a"} type={'Receitas do dia'} value={receive} />
                <Banner color={'#EF463A'} type={'Despesas do dia'} value={cost} />
            </BannersContainer>
            <CardsContainer>
                {console.log(finances)}
                {finances.map(item => (<Card key={item.id} data={item} />))}
            </CardsContainer>
        </div>
    )
}
