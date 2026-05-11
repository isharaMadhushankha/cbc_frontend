import React from 'react'
import Headers from '../Components/Headers'
import { Route, Routes } from 'react-router-dom'
import Home from './Customer/Home'
import About from './Customer/About'
import Philosophy from './Customer/Philosophy'
import Contact from './Customer/Contact'
import UserProfile from './Customer/UserProfile'
import OrdersPage from './Customer/OrdersPage'
import WishlistPage from './Customer/WishlistPage'
import BecomeSeller from './Customer/BecomeSeller'
import HelpSupport from './Customer/HelpSupport'
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
        <Route path= 'about' element={<About/>}/>
        <Route path= 'philosophy' element={<Philosophy/>}/>
        <Route path='contact' element ={<Contact/>}/>
        <Route path='profile' element ={<UserProfile/>}/>
        <Route path='orders' element ={<OrdersPage/>}/>
        <Route path='wishlist' element ={<WishlistPage/>}/>
        <Route path='become-seller' element ={<BecomeSeller/>}/>
        <Route path='help-support' element ={<HelpSupport/>}/>
        <Route path='overview/:id' element={<ProductOverView/>}/>
        <Route path='cart' element ={<CartPage/>}/>
        <Route path='checkout' element ={<Checkout/>}/>
        <Route path='/*' element= {<h1 className="p-10">404 Not found</h1>}/>
      </Routes>
    </div>
  )
}

export default HomePage