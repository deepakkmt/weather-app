import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Router,  } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import Landing_page from './components/landing_page.jsx';
import Signup from './components/signup.jsx';


createRoot(document.getElementById('root')).render(
 <StrictMode>

    
    <App/>
   
 </StrictMode>
)
