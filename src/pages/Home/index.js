import Banner from "./components/banner";

export default function Home() {
    return (
        <div>
            <div style={{ display: "flex", padding: "1.5em" }}>
                <Banner color={"#3b3dbf"} type={'Saldo disponivel'} value={1500} />
                <Banner color={" #00b94a"} type={'Receitas do dia'} value={3000} />
                <Banner color={'#EF463A'} type={'Despesas do dia'} value={-1500} />
            </div>


        </div>
    )
}