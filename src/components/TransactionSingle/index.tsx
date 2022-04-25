import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import styles from './styles.module.css';

interface TransactionSingleProps{
    title: string,
    description: string,
    amount: number,
    type: string,
    created_at: string,
}

export default function TransactionSingle({ 
    title, 
    description, 
    amount, 
    type, 
    created_at ,
}:TransactionSingleProps){

    return (
        <div className={
            `${styles.transactionSingle} 
            ${
                type == "Deposit" ? 
                styles.transactionDeposit : 
                styles.transactionWithdraw
            }`
        }>
            <div className={styles.transactionTitle}>
                <h3>
                {
                    type == "Deposit" ? 
                    <FaArrowUp /> : 
                    <FaArrowDown />
                }{title}
                </h3>
                <p>{description}</p>
            </div>
            <div className={styles.transactionInfo}>
                <span>R${amount}</span>
                <span>{created_at}</span>
            </div>
        </div>
    )
}