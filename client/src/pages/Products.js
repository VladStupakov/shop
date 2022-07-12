import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ProductsList from '../components/Products/ProductsList'
import ProductFilters from '../components/Products/ProductFilters'
import { fetchProducts } from '../API/ProductApi'

const Container = styled.div`
    display: flex;
    margin-top: 50px;
    min-height: 700px;
`

const Products = () => {

  const [selectedCategory, setSelectedCategory] = useState()
  const [selectedBrands, setSelectedBrands] = useState([])

  const [products, setProducts] = useState()

  useEffect(() => {
      fetchProducts(selectedBrands, selectedCategory?._id)
      .then(products => setProducts(products.data))
  }, [selectedBrands, selectedCategory])

  return (
    <Container>
        <ProductFilters setCategory={setSelectedCategory} setBr={setSelectedBrands}/>
        <ProductsList products={products}/>
    </Container>
  )
}

export default Products