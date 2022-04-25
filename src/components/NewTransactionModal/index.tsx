import { FormEvent, useRef, useState } from 'react';
import { useTransactions } from '../../Hooks/useTransactions';
import styles from './styles.module.css';

interface NewTransactionModalProps{
    isOpenModal: boolean,
    setIsOpenModal: (state: boolean) => void
}

export default function NewTransactionModal({ isOpenModal, setIsOpenModal }: NewTransactionModalProps){

    const { setModalChange } = useTransactions()

    const modalRef = useRef<HTMLDivElement>(null);
    const [ title, setTitle ] = useState("");
    const [ type, setType ] = useState("Deposit");
    const [ description, setDescription ] = useState("");
    const [ amount, setAmount ] = useState(0);

    async function formSubmit( e :FormEvent){
        e.preventDefault()

        const newTransaction = { title, type, description, amount };
        
        const response = await fetch(`https://mywallet-app-backend.herokuapp.com/transactions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ title, type, description, amount })
        })

        console.log(JSON.stringify(newTransaction))

        const data = await response.json()

        if(response.status == 200){
            setIsOpenModal(false);
            setModalChange(true);
        }else{
            console.log(response)
        }
    }

    return(

        <div ref={modalRef} className={styles.modalContainer} onClick={({target}) => {target == modalRef.current && setIsOpenModal(false)}}>
            
            <div className={styles.modalContent}>
                <h1>Nova Transação</h1>
                <form className={styles.modalForm} onSubmit={formSubmit} >
                    <label htmlFor="title">
                        <span>Título</span>
                        <input type="text" name="title" id="title" onChange={({target})=> {setTitle(target.value)}} value={title} />
                    </label>

                    <label htmlFor="type" className={styles.typeLabel}>
                        <span>Tipo</span>
                        <div>
                            <input 
                                onChange={({target})=> {target.value == "Deposit" ? setType("Deposit") : setType("Withdraw") }}
                                checked={type == "Deposit"} 
                                type="radio" 
                                name="type" 
                                id="Deposit" 
                                value="Deposit" 
                            />
                            <label 
                                htmlFor="Deposit" 
                                className={styles.depositInput}
                            ><span>Entrada</span>
                            </label>
                            
                            
                            <input 
                                onChange={({target})=> {target.value == "Withdraw" ? setType("Withdraw") : setType("Deposit") }}
                                checked={type == "Withdraw"} 
                                type="radio" 
                                name="type" 
                                id="Withdraw" 
                                value="Withdraw" 
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
                        <input type="text" name="description" id="description" onChange={({target})=> {setDescription(target.value)}} value={description} />
                    </label>

                    <label htmlFor="amount">
                        <span>Valor</span>
                        <input type="number" name="amount" id="amount" onChange={({target})=> {setAmount(+target.value)}} value={amount} />
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