import { FormEvent, useEffect, useRef, useState } from 'react';
import { TransactionInterface, useTransactions } from '../../Hooks/useTransactions';
import { MdModeEditOutline, MdDeleteForever } from 'react-icons/md';
import styles from './styles.module.css';

interface TransactionModalProps{
    isOpenModal: boolean,
    setIsOpenModal: (state: boolean) => void
    transaction:TransactionInterface
}

export default function TransactionModal({ isOpenModal, setIsOpenModal, transaction }: TransactionModalProps){

    const { setModalChange } = useTransactions()

    const modalRef = useRef<HTMLDivElement>(null);
    const [ title, setTitle ] = useState("");
    const [ type, setType ] = useState("Deposit");
    const [ description, setDescription ] = useState("");
    const [ amount, setAmount ] = useState<number>();
    const [ edit, setEdit ] = useState(false);

    async function formSubmit( e :FormEvent){
        e.preventDefault()

        const editTransaction = { title, type, description, amount };

        const response = await fetch(`https://mywallet-app-backend.herokuapp.com/transactions/${transaction.id}`, {
            method: "PUT",
            headers: {
                Authorization: `bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(editTransaction)
        })

        const data = await response.json()

        if(response.status == 200){
            setIsOpenModal(false);
            setModalChange(true);
        }else{
            console.log(response)
        }

    }

    async function deleteTransaction(){

        const response = await fetch(`https://mywallet-app-backend.herokuapp.com/transactions/${ transaction.id }`, {
            method: "DELETE",
            headers: {
                Authorization: `bearer ${localStorage.getItem("token")}`
            }
        })

        console.log(response)

        if(response.status == 200){
            setIsOpenModal(false);
            setModalChange(true);
        }else{
            console.log(response)
        }

    }

    useEffect(()=>{
        setTitle(transaction.title)
        setType(transaction.type)
        setDescription(transaction.description);
        setAmount(transaction.amount);
    },[transaction]);

    return(

        <div ref={modalRef} className={styles.modalContainer} onClick={({target}) => {target == modalRef.current && setIsOpenModal(false)}}>
            
            <div className={styles.modalContent}>
                <div className={styles.controls}>
                    <button className={styles.editButton} onClick={()=> {setEdit(!edit)}}><MdModeEditOutline /></button>
                    <button className={styles.deleteButton} onClick={()=>{deleteTransaction()}}><MdDeleteForever /></button>
                </div>
                <h1>Transação</h1>
                <form className={styles.modalForm} onSubmit={formSubmit} >

                    <label htmlFor="title">
                        <span>Título</span>
                        <input disabled={!edit} type="text" name="title" id="title" onChange={({target})=> {setTitle(target.value)}} value={title} />
                    </label>

                    <label htmlFor="type" className={styles.typeLabel}>
                        <span>Tipo</span>
                        <div>
                            <input 
                                onChange={({target}) => {target.value == "Deposit" ? setType("Deposit") : setType("Withdraw") }}
                                checked={type == "Deposit"} 
                                type="radio" 
                                name="type" 
                                id="Deposit" 
                                value="Deposit"
                                disabled={!edit} 
                            />
                            <label 
                                htmlFor="Deposit" 
                                className={styles.depositInput}
                            ><span>Entrada</span>
                            </label>
                            
                            
                            <input 
                                onChange={({target}) => {target.value == "Withdraw" ? setType("Withdraw") : setType("Deposit") }}
                                checked={type == "Withdraw"} 
                                type="radio" 
                                name="type" 
                                id="Withdraw" 
                                value="Withdraw" 
                                disabled={!edit}
                            />                            
                            <label 
                                htmlFor="Withdraw" 
                                className={styles.withdrawInput}
                            ><span>Saída</span>
                            </label>
                        </div>
                    </label>

                    <label htmlFor="description">
                        <span>Descrição</span>
                        <input disabled={!edit} type="text" name="description" id="description" onChange={({target})=> {setDescription(target.value)}} value={description} />
                    </label>

                    <label htmlFor="amount">
                        <span>Valor</span>
                        <input disabled={!edit} type="number" name="amount" id="amount" onChange={({target})=> {setAmount(+target.value)}} value={amount} />
                    </label>

                    <div className={styles.buttonContainer}>
                        <button type="button" className={styles.buttonRed} onClick={() => {setIsOpenModal(false)}}>Cancelar</button>
                        <button type="submit" className={styles.buttonGreen}>Confirmar</button>
                    </div>

                </form>
            </div>
        </div>
    )
}