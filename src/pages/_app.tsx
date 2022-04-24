import type { AppProps } from 'next/app'
import { AutheticationContextProvider } from '../Hooks/useAuthentication';
import { TransactionsContextProvider } from '../Hooks/useTransactions';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
  <AutheticationContextProvider>
    <TransactionsContextProvider>
      <Component {...pageProps} />
    </TransactionsContextProvider>    
  </AutheticationContextProvider>
  )
}

export default MyApp
