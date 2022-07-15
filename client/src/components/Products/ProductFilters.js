import { Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
import { setSelectedBrands, setSelectedCategory } from '../../store/filtersSlice'


const Container = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
`
const FilterName = styled.div`
    display: flex;
    height: 40px;
    border-bottom: 1px solid lightgray;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    font-weight: bold;
`

const FilterContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    border: 1px solid lightgray;
    border-radius: 3%;
    margin-bottom: 5px;
`

const CategoryItem = styled.div`
    display: flex;
    justify-content: center;
    border-bottom: 1px solid lightgray;
    font-size: 20px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    cursor: pointer;
    ${props =>
    props.selected &&
    css`
      background-color: cornflowerblue;
      color: white;
    `}
`

const ProductFilters = () => {

  let categories = useSelector(state => state.filters.categories)
  categories = [{ _id: null, name: 'All categories' }, ...categories]
  const brands = useSelector(state => state.filters.brands)
  const selectedCategory = useSelector(state => state.filters.selectedCategory)
  const selectedBrands = useSelector(state => state.filters.selectedBrands)
  const dispatch = useDispatch()

  const handleCategoryChange = (id) => {
    id === 1 ? dispatch(setSelectedCategory(null)) : dispatch(setSelectedCategory(id))
  }

  const handleBrandToggle = (value) => () => {
    const currentIndex = selectedBrands.indexOf(value)
    currentIndex === -1 ?
      dispatch(setSelectedBrands([...selectedBrands, value]))
      :
      dispatch(setSelectedBrands(selectedBrands.filter(item => item !== value)))
  };

  const CategoryFilter = React.memo(() => {
    return (
      <FilterContainer>
        <FilterName>Categories</FilterName>
        {
          categories &&
          categories.map(category => {
            return <CategoryItem key={category._id} onClick={() => handleCategoryChange(category._id)} selected={category._id === selectedCategory || null}>{category.name}</CategoryItem>
          })
        }
      </FilterContainer>
    )
  })

  const BrandFilter = React.memo(() => {
    return (
      <FilterContainer>
        <FilterName>Brands</FilterName>
        <List sx={{ width: '80%' }}>
          {brands && brands.map((brand) => {
            const labelId = `checkbox-list-label-${brand._id}`;
            return (
              <ListItem
                key={brand._id}
                disablePadding
                sx={{ width: '125%' }}
              >
                <ListItemButton role={undefined} onClick={handleBrandToggle(brand._id)} >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={selectedBrands.indexOf(brand._id) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={`${brand.name}`} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </FilterContainer>)
  })

  return (
    <Container>
      <CategoryFilter />
      <BrandFilter />
    </Container>
  )
}

export default ProductFilters