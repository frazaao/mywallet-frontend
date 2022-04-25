import { UserInterface } from "../../pages/transactions"
import styles from './styles.module.css';

interface HeaderProps{
    user: UserInterface
    setIsOpenModal: (value: boolean) => void
}

export default function Header({ user, setIsOpenModal }: HeaderProps){
    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <h1>MyWallet</h1>
                <p>Olá <strong>{user.name}</strong>, Essa é sua carteira</p>
                <div className={styles.buttonContainer}>
                    
                    <button 
                        type="button" 
                        className={styles.buttonGreen}
                        onClick={()=> {setIsOpenModal(true)}}
                    >Nova Transação
                    </button>

                    <button 
                        type="button" 
                        className={styles.buttonRed}
                    >Logout
                    </button>
                </div>
            </div>
        </header>
    )
}