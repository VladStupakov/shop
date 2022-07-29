import { IconButton } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { deleteBrand, getUserBrands } from '../../API/ProductApi';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BrandModal from '../Modals/BrandModal';
import { useEffect } from 'react';
import ProductModal from '../Modals/ProductModal';
import { setSelectedBrands } from '../../store/filtersSlice';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin: 10px;
  overflow-y: scroll;
  scrollbar-width: thin;
`

const NoBrandsTitle = styled.div`
  width: 100%;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
`

const BrandsList = styled.div`
  display: flex; 
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Brand = styled.div`
  display: flex;
  font-size: 20px;
  margin: 20px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 12px;
  align-items: center;
  width: 80%;
`

const BrandName = styled.div`
  display: flex;
  flex: 2;
`

const BrandCountry = styled.div`
  display: flex;
  flex: 2;
`

const EditBrandIcons = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
`

const CreateTitle = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
  font-size: 22px;
`

const CustomIconButton = styled(IconButton)`
  
`

const ProductsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding: 10px;
  border: 1px solid lightgray;
  border-radius: 12px;
  height: 50vh;
`

const CreateProduct = styled.div`
  display: flex;
  justify-content: center;
`

const ProductsList = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  height: 50vh;
`

const Product = styled.div`
  display: flex;
  border-bottom: 1px solid lightgray;
  margin: 10px;
  padding: 5px;
`

const ProductsManagement = ({ userId }) => {

  const [brands, setBrands] = useState()
  const [updateBrandsList, setUpdateBrandsList] = useState(0)
  const [openBrandModal, setOpenBrandModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [selectedBrand, setSelectedBrand] = useState()
  const [openProductModal, setOpenProductModal] = useState(false)
  const [isProductEdit, setIsProductEdit] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState()
  const [products, setProducts] = useState()

  const handleDeleteBrand = () => {
    deleteBrand(selectedBrand._id)
      .then(() => {
        getUserBrands(userId)
          .then(response => setBrands(response))
      })
  }

  useEffect(() => {
    getUserBrands(userId)
      .then(response => setBrands(response))
  }, [updateBrandsList])

  return (
    <Container>
      {
        brands === undefined ?
          <NoBrandsTitle>
            You don't have any created brands
          </NoBrandsTitle>
          :
          <BrandsList>
            <CreateTitle>Your brands</CreateTitle>
            {
              brands?.map(brand => {
                return (
                  <Brand key={brand._id} onMouseEnter={() => { setSelectedBrand(brand) }} id={brand._id} >
                    <BrandName>{brand.name}</BrandName>
                    <BrandCountry>{brand.country}</BrandCountry>
                    <EditBrandIcons>
                      <CustomIconButton sx={{ margin: '0 10px' }} onClick={() => { setOpenBrandModal(true); setSelectedBrand(brand); setIsEdit(true) }}>
                        <EditIcon />
                      </CustomIconButton>
                      <CustomIconButton sx={{ margin: '0 10px' }} onClick={handleDeleteBrand}>
                        <DeleteIcon />
                      </CustomIconButton>
                    </EditBrandIcons>
                  </Brand>
                )
              })
            }
          </BrandsList>
      }
      <CreateTitle>Create brand</CreateTitle>
      <CustomIconButton color="primary" size="large" onClick={() => setOpenBrandModal(true)}>
        <AddIcon />
      </CustomIconButton>
      <ProductsContainer>
        <CreateProduct>
          <CreateTitle>Create product</CreateTitle>
          <CustomIconButton color="primary" size="large" onClick={() => setOpenProductModal(true)}>
            <AddIcon />
          </CustomIconButton>
        </CreateProduct>
        {
          products ?
            <>
              <CreateTitle>Your products</CreateTitle>
              <ProductsList>

              </ProductsList>
            </>
            :
            <CreateTitle>No products yet</CreateTitle>
        }
      </ProductsContainer>
      <BrandModal openBrandModal={openBrandModal} setOpenBrandModal={setOpenBrandModal} isEdit={isEdit} setIsEdit={setIsEdit} selectedBrand={selectedBrand} setUpdateBrandsList={setUpdateBrandsList}></BrandModal>
      <ProductModal openProductModal={openProductModal} setOpenProductModal={setOpenProductModal} isProductEdit={isProductEdit} setIsProductEdit={setIsProductEdit} selectedProduct={selectedProduct} brands={brands} ></ProductModal>
    </Container>
  )
}

export default ProductsManagement