import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home.js'
import Product from '../pages/Product.js'
import Products from '../pages/Products.js'
import Register from '../pages/Register.js'


const AppRouter = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    )
}

export default AppRouter