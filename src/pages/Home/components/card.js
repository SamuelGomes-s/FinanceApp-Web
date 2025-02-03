import styled from "styled-components";
import { IoArrowDownOutline, IoArrowUpOutline } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useState } from "react";
import Loading from "../../../components/Loader";

export default function Card({ data, deleteItem, editItem, loader }) {
    const [status, setStatus] = useState(data?.type)

    function handleDelete() {
        deleteItem(data)
    }
    function handleEdit() {
        editItem(data.id)
    }

    return (
        <Container>
            <Text>{data?.name}</Text>
            <Divisor />
            <Description>{data?.description == null ? 'Sem descrição disponível.' : data?.description}</Description>
            <Date>Cadastrado em {data?.createdAt}</Date>
            <Divisor />
            <Info>
                <Value>R$ {data?.value}</Value>
                <Type $status={status}>
                    {status === 'cost' ? <IoArrowDownOutline /> : <IoArrowUpOutline />}
                    {status === 'cost' ? " Despesas" : " Receitas"}
                </Type>
            </Info>
            <div style={{ display: "flex", alignItems: "center", justifyContent: 'center', gap: 10 }}>
                {loader ? (<Loading />) : (
                    <>
                        <ActionBtn onClick={handleDelete} $hover={' #ef463a'}>
                            <FaRegTrashAlt size={25} />
                        </ActionBtn>
                        <ActionBtn onClick={handleEdit} $hover={' #3b3dbf'}>
                            <MdEdit size={25} />
                        </ActionBtn>
                    </>)}
            </div>
        </Container>
    )
}


const Container = styled.div`
    width: 100%;
    max-height: 400px;
    background-color:#E0E5F8;
    display: flex;
    flex-direction: column;
    padding: 0.7em;
    border-radius: 8px;
    max-width: 450px;
`;

const Text = styled.span`
    font-size: 25px;
    font-weight: bold;
    color: #000;
    margin-bottom: 0.5em;
`;

const Divisor = styled.div`
    border: 1px solid  #2B2D42;
`;

const Description = styled.p`
    background-color: #FFFFFF;
    margin: 15px 0;
    min-height: 150px;
    border-radius: 8px;
    padding: 0.5em;
    word-wrap: break-word;  
`;

const Type = styled.span`
    display: flex;
    background-color:${props => props.$status == 'cost' ? '#EF463A' : '#00B94a'};
    border-radius: 80px;
    width: 100px;
    color: #FFFFFF;
    font-weight: bold;
    padding: 0.2em;
    align-items: center;
    justify-content: center;
    gap: 3px;
`;

const Info = styled.div`
    display: flex;
    margin-top: 1.5em;
    align-items: center;
    justify-content: space-between;
`;

const Value = styled.span` 
    font-size: 25px;
    font-weight: bold;
    color: #000;
`;

const ActionBtn = styled.button`
    border: 0;
    cursor: pointer;
    margin-top: 1.2em;
    background-color: transparent;
    transition: ease-in-out 0.5ms;
    &:hover{
        transform: scale(1.1);
        color: ${props => props.$hover};
    };
    &:active{
        transform: scale(1.0);
    }
`;

const Date = styled.span`
    font-size: 16px;
    margin-bottom: 0.5em;
`;

