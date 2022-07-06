import React, { useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { fetchProducts } from '../API/ProductApi'

const Container = styled.div`
    margin-top: 50px;
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
                    return(
                        <div>
                            <div>{product.name}</div>
                            <div>{product.description}</div>
                            <div>{product.brand}</div>
                        </div>
                    )
                })
            }
        </Container>
    )
}

export default ProductsList