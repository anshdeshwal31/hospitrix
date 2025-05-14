import { createRoot } from 'react-dom/client'
import './index.css'
import { DoctorContextProvider } from './context/DoctorContext.tsx'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <DoctorContextProvider>
      <App />
    </DoctorContextProvider>
  // </StrictMode>,
)
