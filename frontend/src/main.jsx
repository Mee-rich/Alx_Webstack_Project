import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import './styles.css'
import App from './App.jsx'
import {TokenProvider} from './components/tokenProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TokenProvider>
      <App /> 
    </TokenProvider>
  </StrictMode>,
)
