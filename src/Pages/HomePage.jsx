import React from 'react'
import Headers from '../Components/Headers'
import { Route, Routes } from 'react-router-dom'
import Home from './Customer/Home'
import ProductPage from './admin/ProductPage'
import ProductOverView from './admin/ProductOverView'
import CartPage from './admin/CartPage'
import Checkout from './admin/Checout'

const HomePage = () => {
  return (
    <div className='w-full h-full bg-primary '>
      <Headers/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/product' element ={<ProductPage/>}/>
        <Route path= '/about' element={<div className="p-10"><h1>About us</h1><p>Welcome to Crystal Beauty Clear. We provide the best skincare products.</p></div>}/>
        <Route path='/contact' element ={<div className="p-10"><h1>Contact Us</h1><p>Email: contact@cbc.com</p></div>}/>
        <Route path='/overview/:id' element={<ProductOverView/>}/>
        <Route path='/cart' element ={<CartPage/>}/>
        <Route path='/checkout' element ={<Checkout/>}/>
        <Route path='/*' element= {<h1 className="p-10">404 Not found</h1>}/>
      </Routes>
    </div>
  )
}

export default HomePage