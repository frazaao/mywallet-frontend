import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useAuthentication } from './useAuthentication';


interface TransactionsContext{
    transactions: TransactionInterface[],
    modalChange: boolean,
    setModalChange: (value: boolean) => void
}

interface TransactionsContextProps{
    children: ReactNode
}

export interface TransactionInterface{
    id: number,
    title: string,
    description: string,
    amount: number,
    type: "Deposit" | "Withdraw",
    created_at: string
}

const transactionsContext = createContext<TransactionsContext>({
    transactions: [],
    modalChange: false,
    setModalChange: () => {}
});

export function TransactionsContextProvider({ children }: TransactionsContextProps){

    const [ transactions, setTransactions ] = useState<TransactionInterface[]>([]);
    const [ modalChange, setModalChange ] = useState(false);
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
        setModalChange(false)
    }

    useEffect(() => {
        modalChange && getTransactions(); 
    },[modalChange]);

    useEffect(() => {
        getTransactions();
    },[]);

    return(
        <transactionsContext.Provider value={{ transactions, modalChange, setModalChange }}>
            { children }
        </transactionsContext.Provider>
    )
}

export function useTransactions(){

    const context = useContext(transactionsContext);

    const { transactions, modalChange, setModalChange } = context;

    return { transactions, modalChange, setModalChange }
    
}