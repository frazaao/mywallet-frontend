
import { useEffect, useState } from 'react';
import { useTransactions, TransactionInterface } from '../../Hooks/useTransactions';
import TransactionSingle from '../TransactionSingle';
import styles from './styles.module.css';

interface TransactionsContainerProps{
    setTransaction: (value: TransactionInterface) => void
    setIsOpenTransactionModal: (value: boolean) => void
}

export default function TransactionsContainer({ setTransaction, setIsOpenTransactionModal }:TransactionsContainerProps) {

    
    const { transactions } = useTransactions();

    const [ depositCount, setDepositCount ] = useState<number>();
    const [ withdrawCount, setWithdrawCount ] = useState<number>();
    const [ totalCount, setTotalCount ] = useState<number>();

    useEffect(() => {
        const depositValue = transactions.map((transaction) => {
            if(transaction.type == 'Deposit'){
                return transaction.amount
            }
        }).filter((t)=> t != undefined);

        const withdrawValue = transactions.map((transaction) => {
            if(transaction.type == 'Withdraw'){
                return transaction.amount
            }
        }).filter((t)=> t != undefined);

        const withdraw = withdrawValue.reduce((acc,acc2) => acc + acc2 , 0)
        const deposit = depositValue.reduce((acc,acc2) => acc + acc2 , 0)

        setDepositCount(deposit);
        setWithdrawCount(withdraw);
        const total = deposit && withdraw ?  deposit - withdraw : 0;
        setTotalCount(total)

    },[transactions]);

    return (
    <main className={styles.transactionsContainer}>
        <div className={styles.displayContainer}>
            <div className={`${styles.displayItem} ${styles.green}`}>
                <p>Entrada</p>
                <div>
                    { depositCount?.toLocaleString('pt-BR', { currency: 'BRL', style: "currency" }) }
                </div>
            </div>

            <div className={`${styles.displayItem} ${styles.red}`}>
                <p>Saída</p>
                <div>
                    { withdrawCount?.toLocaleString('pt-BR', { currency: 'BRL', style: "currency" }) }
                </div>
            </div>

            <div className={`${styles.displayItem} ${styles.blue}`}>
                <p>Saldo</p>
                <div>
                    { totalCount?.toLocaleString('pt-BR', { currency: 'BRL', style: "currency" }) }
                </div>
            </div>
        </div>
        <div className={styles.transactionsTable}>
        
            { 
                transactions.map((transaction) =>{
                    return(
                        <div onClick={()=> {setTransaction(transaction), setIsOpenTransactionModal(true)}} key={transaction.id}>
                            <TransactionSingle                         
                            title={transaction.title} 
                            description={transaction.description} 
                            amount={transaction.amount}
                            type={transaction.type}
                            created_at={transaction.created_at}                            
                            />
                        </div>
                    )
                })
            }
        </div>
    </main>
    )
}