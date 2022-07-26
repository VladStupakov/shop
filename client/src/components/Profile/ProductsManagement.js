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
import { createBrand } from '../../API/ProductApi';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 10px;
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
`

const Brand = styled.div`
  display: flex;
`

const CreateBrandTitle = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
  font-size: 22px;
`

const CreateBrandButton = styled(IconButton)`
 
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

const ProductsManagement = ({ userId }) => {

  const userBrands = useSelector(state => state.filters.brands.filter(brand => brand.creator === userId))
  const [openBrandModal, setOpenBrandModal] = useState(false)
  const [responseError, setResponseError] = useState()


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

  const formik = useFormik({
    initialValues: {
      name: '',
      country: ''
    },
    validationSchema: brandSchema,
    onSubmit: formSubmit
  })

  return (
    <Container>
      {
        userBrands.length === 0 ?
          <NoBrandsTitle>
            You don't have any created brands
          </NoBrandsTitle>
          :
          <BrandsList>
            {
              userBrands.map(brand => {
                return (
                  <Brand key={brand._id}>
                    <div>{brand.name}</div>
                  </Brand>
                )
              })
            }
          </BrandsList>
      }
      <CreateBrandTitle>Create brand</CreateBrandTitle>
      <CreateBrandButton color="primary" size="large" onClick={() => setOpenBrandModal(true)}>
        <AddIcon />
      </CreateBrandButton>
      <Modal
        open={openBrandModal}
        onClose={() => setOpenBrandModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
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
            <Button variant="contained" type='submit'>
              Create
            </Button>
            <ResponseError>{responseError}</ResponseError>
          </Form>
        </CreateBrandFormContainer>
      </Modal>
    </Container>
  )
}

export default ProductsManagement