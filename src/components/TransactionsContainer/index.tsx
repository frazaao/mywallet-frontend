import styles from './styles.module.css';

export default function TransactionsContainer() {
    return (
    <main className={styles.transactionsContainer}>
        <div className={styles.displayContainer}>
            <div className={styles.displayItem}>
                <p>Entrada</p>
                <div>
                    R$1600
                </div>
            </div>

            <div className={styles.displayItem}>
                <p>Saída</p>
                <div>
                    R$1600
                </div>
            </div>

            <div className={styles.displayItem}>
                <p>Saldo</p>
                <div>
                    R$1600
                </div>
            </div>
        </div>
        <div className={styles.transactionsTable}>

        </div>
    </main>
    )
}