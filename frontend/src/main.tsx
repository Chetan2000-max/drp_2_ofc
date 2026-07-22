import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
// import Login from './components/login.tsx' 
// import Users from './components/users.tsx'
// import AddTask from './components/task.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App/>
    
    </BrowserRouter>
  </StrictMode>,
)
