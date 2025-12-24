import React from 'react'
import Headers from '../Components/Headers'
import { Route, Routes } from 'react-router-dom'
import ProductPage from './admin/ProductPage'
import ProductOverView from './admin/ProductOverView'
import CartPage from './admin/CartPage'
import Checkout from './admin/Checout'

const HomePage = () => {
  return (
    <div className='w-full h-full bg-primary '>
      <Headers/>
      <Routes path="/">
        <Route path='/' element={<h1>welcome to home page</h1>}/>
        <Route path='/product' element ={<ProductPage/>}/>
        <Route path= '/about' element={<h1>About us</h1>}/>
        <Route path='/contact' element ={<h1> contact</h1>}/>
        <Route path='/*' element= {<h1>404 Not found</h1>}/>
        <Route path='/overview/:id' element={<ProductOverView/>}/>
        <Route path='/cart' element ={<CartPage/>}/>
        <Route path='/checkout' element ={<Checkout/>}/>
      </Routes>
    </div>
  )
}

export default HomePage