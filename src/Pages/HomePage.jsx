import React from 'react'
import Headers from '../Components/Headers'
import { Route, Routes } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className='w-full h-full bg-primary'>
      <Headers/>
      <Routes path="/">
        <Route path='/' element={<h1>welcome to home page</h1>}/>
        <Route path='/Product' element ={<h1> product list</h1>}/>
        <Route path= '/about' element={<h1>About us</h1>}/>
        <Route path='/contact' element ={<h1> contact</h1>}/>
        <Route path='/*' element= {<h1>404 Not found</h1>}/>
      </Routes>
    </div>
  )
}

export default HomePage