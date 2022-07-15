import { Pagination } from '@mui/material'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { fetchProducts } from '../../API/ProductApi'
import { setFetchLimit, setPageNumber, setSelectedSort } from '../../store/filtersSlice'
import ProductItem from './ProductItem'

const Container = styled.div`
    display: flex;  
    flex: 4;
    flex-direction: column;
`

const SelectListContainer = styled.div`
    display: flex;
`

const SelectContainer = styled.div`
    display: flex;
    margin-left: 3px;
    margin-right: 10px;
`

const SelectLabel = styled.div`
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Select = styled.select`
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
    const [totalPages, setTotalPages] = useState()
    const selectedCategory = useSelector(state => state.filters.selectedCategory)
    const selectedBrands = useSelector(state => state.filters.selectedBrands)
    const selectedSort = useSelector(state => state.filters.selectedSort)
    const fetchLimit = useSelector(state => state.filters.fetchLimit)
    const page = useSelector(state => state.filters.pageNumber)
    const dispatch = useDispatch()

    useEffect(() => {
        fetchProducts(selectedBrands, selectedCategory, page, fetchLimit, selectedSort)
            .then(products => {
                setProducts(products.data)
                setTotalPages(Math.ceil(products.totalQuantity / fetchLimit))
            })
    }, [selectedBrands, selectedCategory, selectedSort, fetchLimit, page])

    const handleSortChange = (e) => {
        dispatch(setSelectedSort(e.target.value))
    }

    const handleLimitChange = (e) => {
        dispatch(setFetchLimit(e.target.value))
    }

    const handlePageChange = (e, page) => {
        dispatch(setPageNumber(page))
    }

    return (
        <Container>
            <SelectListContainer>
                <SelectContainer>
                    <SelectLabel>Sort by</SelectLabel>
                    <Select defaultValue={selectedSort} onChange={handleSortChange}>
                        <option>Price (desc)</option>
                        <option>Price (asc)</option>
                        <option >New</option>
                    </Select>
                </SelectContainer>
                <SelectContainer>
                    <SelectLabel>Products on page</SelectLabel>
                    <Select defaultValue={fetchLimit} onChange={handleLimitChange}>
                        <option>10</option>
                        <option>20</option>
                        <option >30</option>
                    </Select>
                </SelectContainer>
            </SelectListContainer>
            <ProductsContainer>
                {
                    products && products.map(product => {
                        return <ProductItem product={product} key={product._id} />
                    })
                }
            </ProductsContainer>
            <Pagination count={totalPages} shape="rounded" color='primary' onChange={handlePageChange} sx={{ m: '20px'}} />
        </Container>
    )
}

export default ProductsList