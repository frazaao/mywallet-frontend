import { useEffect, useState } from "react";
import Header from "../../components/Header";
import NewTransactionModal from "../../components/NewTransactionModal";
import TransactionModal from "../../components/TransactionModal";
import TransactionsContainer from "../../components/TransactionsContainer";
import { TransactionInterface } from '../../Hooks/useTransactions';

export interface UserInterface {
    id:number,
    name: string,
    email: string,
    type: string,
}

export default function Transactions() {

    const [ isOpenNewTransactionModal, setIsOpenNewTransactionModal ] = useState(false);
    const [ isOpenTransactionModal, setIsOpenTransactionModal ] = useState(false);
    const [ transaction, setTransaction ] = useState<TransactionInterface>({
        amount: 0,
        created_at: "",
        description: "",
        id: 0,
        title: "",
        type: "Deposit"
    });

    const [ user, setUser ] = useState<UserInterface>({
        id:0,
        name: "",
        email: "",
        type: "",
    });

    useEffect(() => {
        fetch("https://mywallet-app-backend.herokuapp.com/users/1",{
            headers: {
                Authorization: `bearer ${localStorage.getItem("token")}`
            }
        })
        .then(response => response.json())
        .then(json => setUser(json))
    },[]);

    return (
        <>
            <Header user={user} setIsOpenModal={setIsOpenNewTransactionModal} />
            <TransactionsContainer setTransaction={setTransaction} setIsOpenTransactionModal={setIsOpenTransactionModal} />
            { isOpenNewTransactionModal && 
            <NewTransactionModal 
                isOpenModal={isOpenNewTransactionModal} 
                setIsOpenModal={setIsOpenNewTransactionModal} 
            /> }
            {
                isOpenTransactionModal &&
                <TransactionModal
                    transaction={transaction}
                    isOpenModal={isOpenTransactionModal} 
                    setIsOpenModal={setIsOpenTransactionModal}
                />
            }
        </>
    )
}