import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AppContextProvider from './context/AppContext.tsx'
import { AdminContextProvider } from './context/AdminContext.tsx'
import { DoctorContextProvider } from './context/DoctorContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppContextProvider>
      <AdminContextProvider>
        <DoctorContextProvider>
          <App />
        </DoctorContextProvider>
      </AdminContextProvider>
      </AppContextProvider>
  </StrictMode>,
)
