
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AdminPage from './Pages/AdminPage.jsx'
import HomePage from './Pages/HomePage.jsx'

function App() {
  
  return (
    <BrowserRouter>
      <div className='w-full h-[100vh] bg-red-600'>
          <Routes path="/">
            <Route path='/' element={<HomePage/>}/>
            <Route path='/register' element={<h1>register</h1>}/>
            <Route path='/admin/*' element={<AdminPage/>}/>
          </Routes>
      </div>
    </BrowserRouter>
  )
}


export default App
