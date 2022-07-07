import React, { useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { fetchProducts } from '../API/ProductApi'
import ProductItem from './ProductItem'

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;    
    flex: 4;
    margin-right: 60px;
`


const ProductsList = () => {

    const [products, setProducts] = useState([])

    useEffect(() => {
        fetchProducts()
        .then(products => setProducts(products.data))
    }, [])

    

    return (
        <Container>
            {
                products.map(product =>{
                   return <ProductItem product={product} key={product._id}/>
                })
            }
        </Container>
    )
}

export default ProductsList