
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AdminPage from './Pages/AdminPage.jsx'
import HomePage from './Pages/HomePage.jsx'
import Testpage from './Pages/Testpage.jsx'
import Login from './Pages/Login.jsx'
import { Toaster } from 'react-hot-toast'


function App() {
  
  return (
    <BrowserRouter>
      <div className='w-full h-[100vh]'>
        <Toaster position='top right'/>
          <Routes path="/">
            <Route path='/*' element={<HomePage/>}/>
            <Route path='/register' element={<h1>register</h1>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/admin/*' element={<AdminPage/>}/>
            <Route path='/test' element={<Testpage/>}/>
          </Routes>
      </div>
    </BrowserRouter>
  )
}


export default App
