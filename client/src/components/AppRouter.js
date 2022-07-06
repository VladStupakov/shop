import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home.js'
import ProductsList from './ProductsList.js'

const AppRouter = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/products" element={<ProductsList />} />
        </Routes>
    )
}

export default AppRouter