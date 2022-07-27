import { Autocomplete, Button, IconButton, Modal, TextField } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { Box } from '@mui/system';
import { useFormik } from 'formik';
import { brandSchema } from '../../schemas/validationSchemas';
import { countries } from '../../utils/consts';
import { createBrand, deleteBrand, updateBrand } from '../../API/ProductApi';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin: 10px;
  overflow: hidden;
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

const CreateBrandFormContainer = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: white;
  border: 2px solid black;
  padding: 30px;
  justify-content: center;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`
const InputContainer = styled.div`
  margin-bottom: 20px;
`

const Input = styled(TextField)`
  width: 100%;
`

const ResponseError = styled.div`
  margin-top: 10px;
  color: red;
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
  border: 1px solid lightgray;
  border-radius: 6px;
  margin: 10px;
`

const ProductsManagement = ({ userId }) => {

  const userBrands = useSelector(state => state.filters.brands.filter(brand => brand.creator === userId))
  const [openBrandModal, setOpenBrandModal] = useState(false)
  const [responseError, setResponseError] = useState()
  const [isEdit, setIsEdit] = useState(false)
  const [selectedBrandId, setSelectedBrandId] = useState()
  const dispatch = useDispatch()

  const formSubmit = (data) => {
    createBrand(data)
      .then(response => {
        response.error ?
          setResponseError(response.data.error)
          :
          setOpenBrandModal(false)
      })
  }

  const editBrand = (data) => {
    updateBrand(selectedBrandId, data)
      .then(response => {
        response.error ?
          setResponseError(response.data.error)
          :
          setOpenBrandModal(false)
      })
  }


  const handleDeleteBrand = () => {
    deleteBrand(selectedBrandId)
      .then(response => {
        response.error ?
          console.log(response.error)
          :
          removeFromList()
      })
  }

  const removeFromList = () => {
    const element = document.getElementById(selectedBrandId)
    element.remove()
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      country: ''
    },
    validationSchema: brandSchema,
    onSubmit: isEdit ? editBrand : formSubmit
  })

  const handleOpenEdit = (brand) => {
    formik.setFieldValue('name', brand.name)
    formik.setFieldValue('country', brand.country)
    setIsEdit(true)
    setOpenBrandModal(true)
  }

  return (
    <Container>
      {
        userBrands.length === 0 ?
          <NoBrandsTitle>
            You don't have any created brands
          </NoBrandsTitle>
          :
          <BrandsList>
          <CreateTitle>Your brands</CreateTitle>
            {
              userBrands.map(brand => {
                return (
                  <Brand key={brand._id} onMouseEnter={() => setSelectedBrandId(brand._id)} id={brand._id}>
                    <BrandName>{brand.name}</BrandName>
                    <BrandCountry>{brand.country}</BrandCountry>
                    <EditBrandIcons>
                      <CustomIconButton sx={{ margin: '0 10px' }} onClick={() => { handleOpenEdit(brand) }}>
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
          <CustomIconButton color="primary" size="large">
            <AddIcon />
          </CustomIconButton>
        </CreateProduct>
        <CreateTitle>Your products</CreateTitle>
        <ProductsList>
          <Product>123</Product>
          <Product>123</Product>
          <Product>123</Product>
          <Product>123</Product>
          <Product>123</Product>
          <Product>123</Product>
          <Product>123</Product>
          <Product>123</Product>
          <Product>123</Product>
          <Product>123</Product>
          <Product>123</Product>
          <Product>123</Product>
          <Product>123</Product>
          <Product>123</Product>
          <Product>123</Product>
          <Product>123</Product>
          <Product>123</Product>
          <Product>123</Product>
          <Product>123</Product>
          <Product>123</Product>
          <Product>123</Product>
        </ProductsList>
      </ProductsContainer>
      <Modal
        open={openBrandModal}
        onClose={() => { setOpenBrandModal(false); setIsEdit(false) }}
      >
        <CreateBrandFormContainer>
          <Form onSubmit={formik.handleSubmit}>
            <InputContainer>
              <Input
                id="name"
                name="name"
                label="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                autoComplete="off"
              />
            </InputContainer>
            <InputContainer>
              <Autocomplete
                id="country-select"
                options={countries}
                autoHighlight
                onChange={(e, value) => formik.setFieldValue("country", value.label)}
                getOptionLabel={(option) => option.label}
                renderOption={(props, option) => (
                  <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    <img
                      loading="lazy"
                      width="20"
                      src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                      srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                      alt=""
                    />
                    {option.label} ({option.code}) +{option.phone}
                  </Box>
                )}
                renderInput={(params) => (
                  <Input
                    {...params}
                    label="Choose a country"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'new-password',
                    }}
                  />
                )}
              />
            </InputContainer>
            {
              isEdit ?
                <Button variant="contained" type='submit'>
                  Save
                </Button>
                :
                <Button variant="contained" type='submit'>
                  Create
                </Button>
            }
            <ResponseError>{responseError}</ResponseError>
          </Form>
        </CreateBrandFormContainer>
      </Modal>
    </Container>
  )
}

export default ProductsManagement