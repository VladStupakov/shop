import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home.js'
import Products from '../pages/Products.js'


const AppRouter = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
        </Routes>
    )
}

export default AppRouter