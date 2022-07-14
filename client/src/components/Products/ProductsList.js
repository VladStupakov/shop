import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { fetchProducts } from '../../API/ProductApi'
import ProductItem from './ProductItem'

const Container = styled.div`
    display: flex;  
    flex: 4;
    flex-direction: column;
`

const SortContainer = styled.div`
    display: flex;
    margin-left: 3px;
`

const SortLabel = styled.div`
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
`
const SortSelect = styled.select`
    display: flex;
    margin-top: 2px;
    margin-left: 10px;
    font-size: 16px;
`

const ProductsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;    
    flex-direction: row;
`


const ProductsList = () => {

    const [products, setProducts] = useState()
    const selectedCategory = useSelector(state => state.filters.selectedCategory)
    const selectedBrands = useSelector(state => state.filters.selectedBrands)
    let selectedSort = useSelector(state => state.filters.selectedSort)
    let fetchLimit = useSelector(state => state.filters.fetchLimit)

    useEffect(() => {
        fetchProducts(selectedBrands, selectedCategory, 1, fetchLimit)
            .then(products => setProducts(products.data))
    }, [selectedBrands, selectedCategory, selectedSort, fetchLimit])

    const handleSortChange = (e) =>{
        console.log(e.target.value)
    }

    return (
        <Container>
            <SortContainer>
                <SortLabel>Sort by</SortLabel>
                <SortSelect defaultValue="New" onChange={handleSortChange}>
                    <option>Price (desc)</option>
                    <option>Price (asc)</option>
                    <option >New </option>
                </SortSelect>
            </SortContainer>
            <ProductsContainer>
                {
                    products && products.map(product => {
                        return <ProductItem product={product} key={product._id} />
                    })
                }
            </ProductsContainer>
        </Container>

    )
}

export default ProductsList