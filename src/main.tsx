import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { KeyboardContextProvider } from './Context/KeyboardContext.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

    <KeyboardContextProvider>
      <App />
    </KeyboardContextProvider>  
,
)
