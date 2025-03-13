import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppContextProvider } from './context/AppContext.tsx'
import { UserContextProvider } from './context/UserContext.tsx'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(

  <UserContextProvider>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </UserContextProvider>
)
