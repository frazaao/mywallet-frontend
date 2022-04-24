import { useEffect, useState } from "react";
import Header from "../../components/Header";
import TransactionsContainer from "../../components/TransactionsContainer";
import { useTransactions } from "../../Hooks/useTransactions";

export interface UserInterface {
    id:number,
    name: string,
    email: string,
    type: string,
}

export default function Transactions() {

    const { transactions } = useTransactions();
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

    console.log(user)

    return (
        <>
            <Header user={user} />
            <TransactionsContainer />
        </>
    )
}