import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AdminPage from './Pages/AdminPage.jsx'
import HomePage from './Pages/HomePage.jsx'
import Testpage from './Pages/Testpage.jsx'
import Login from './Pages/Login.jsx'
import Register from './Pages/Register.jsx'
import { Toaster } from 'react-hot-toast'
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  
  return (
    <BrowserRouter>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className='w-full h-[100vh]'>
        <Toaster position='top right'/>
          <Routes>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/admin/*' element={<AdminPage/>}/>
            <Route path='/test' element={<Testpage/>}/>
            <Route path='/*' element={<HomePage/>}/>
          </Routes>
      </div>
      </GoogleOAuthProvider>;
    </BrowserRouter>
  )
}

export default App
