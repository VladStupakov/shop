import { Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { fetchBrands, fetchCategories } from '../API/ProductApi'

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

const ProductFilters = ({setCategory, setBr}) => {

  const [categories, setCategories] = useState()
  const [brands, setBrands] = useState()
  const [selectedCategory, setSelectedCategory] = useState()
  const [selectedBrands, setSelectedBrands] = useState([])

  useEffect(() => {
    fetchCategories()
      .then(data => setCategories([{ name: 'All categories', _id: 1 }, ...data]))
    fetchBrands()
      .then(data => setBrands(data))
  }, [selectedCategory, selectedBrands])

  const handleCategoryChange = (category) => {
      setSelectedCategory(category)
      if(category._id === 1)
        setCategory()
      else
      setCategory(category)
  }

  const handleToggle = (value) => () => {
    const currentIndex = selectedBrands.indexOf(value);
    if (currentIndex === -1) {
      setSelectedBrands([...selectedBrands, value])
      setBr([...selectedBrands, value])
    } else {
      setSelectedBrands(selectedBrands.filter(item => item !== value));
      setBr(selectedBrands.filter(item => item !== value))
    }
  };


  return (
    <Container>
      <FilterContainer>
        <FilterName>Categories</FilterName>
        {
          categories &&
          categories.map(category => {
            return <CategoryItem key={category._id} onClick={() => handleCategoryChange(category)} selected={selectedCategory?._id === category._id}>{category.name}</CategoryItem>
          })
        }
      </FilterContainer>
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
              <ListItemButton role={undefined} onClick={handleToggle(brand._id)} >
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
      </FilterContainer>
    </Container>
  )
}

export default ProductFilters