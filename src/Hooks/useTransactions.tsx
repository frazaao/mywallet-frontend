import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useAuthentication } from './useAuthentication';


interface TransactionsContext{
    transactions: TransactionInterface[]
}

interface TransactionsContextProps{
    children: ReactNode
}

interface TransactionInterface{
    id: number,
    title: string,
    description: string,
    amount: number,
    type: "Deposit" | "Withdraw",
    created_at: Date
}

const transactionsContext = createContext<TransactionsContext>({
    transactions: []
});

export function TransactionsContextProvider({ children }: TransactionsContextProps){

    const [ transactions, setTransactions ] = useState<TransactionInterface[]>([]);
    const [ newTransaction, setNewTransaction ] = useState<Omit<TransactionInterface, "created_at">>()
    async function getTransactions() {
        const response = await fetch('https://mywallet-app-backend.herokuapp.com/transactions',{
            headers: {
                Authorization: `bearer ${localStorage.getItem("token")}`
            }
        })

        const data = await response.json();
        if(response.status == 200){
            setTransactions(data);
        }else{
            console.log(response)
        }
    }

    useEffect(() => {
        getTransactions();
    },[]);

    return(
        <transactionsContext.Provider value={{ transactions }}>
            { children }
        </transactionsContext.Provider>
    )
}

export function useTransactions(){

    const context = useContext(transactionsContext);

    const { transactions } = context;

    return { transactions }
    
}