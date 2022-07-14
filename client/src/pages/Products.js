import React from 'react'
import styled from 'styled-components'
import ProductsList from '../components/Products/ProductsList'
import ProductFilters from '../components/Products/ProductFilters'

const Container = styled.div`
    display: flex;
    margin-top: 50px;
    min-height: 700px;
`

const Products = () => {

  return (
    <Container>
        <ProductFilters />
        <ProductsList />
    </Container>
  )
}

export default Products