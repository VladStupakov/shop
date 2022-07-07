import React from 'react'
import styled from 'styled-components'
import ProductsList from '../components/ProductsList'
import ProductsPageCategories from '../components/ProductsPageCategories'

const Container = styled.div`
    display: flex;
    margin-top: 50px;
`

const Products = () => {
  return (
    <Container>
        <ProductsPageCategories />
        <ProductsList/>
    </Container>
  )
}

export default Products