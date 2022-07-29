import React, { useState } from 'react'
import { countries } from '../../utils/consts';
import { useFormik } from 'formik';
import { brandSchema } from '../../schemas/validationSchemas';
import { createBrand, updateBrand } from '../../API/ProductApi';
import { Autocomplete, Button, Modal, TextField } from '@mui/material';
import { Box } from '@mui/system';
import styled from 'styled-components';
import { useEffect } from 'react';

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

const BrandModal = ({ openBrandModal, setOpenBrandModal, isEdit, setIsEdit, selectedBrand, setUpdateBrandsList }) => {

    const [responseError, setResponseError] = useState()

    const closeModal = () => {
        setUpdateBrandsList(prevState => prevState += 1)
        setIsEdit(false)
        setOpenBrandModal(false)
    }

    const formSubmit = (data) => {
        createBrand(data)
            .then(response => {
                response.error ?
                    setResponseError(response.data.error)
                    :
                    closeModal()
            })
    }

    const editBrand = (data) => {
        updateBrand(selectedBrand._id, data)
            .then(response => {
                response.error ?
                    setResponseError(response.data.error)
                    :
                    closeModal()
            })
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            country: ''
        },
        validationSchema: brandSchema,
        onSubmit: isEdit ? editBrand : formSubmit
    })

    useEffect(() => {
        isEdit ?
            formik.setFieldValue('name', selectedBrand.name)
            :
            formik.setFieldValue('name', '')
    }, [isEdit])

    return (
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
    )
}

export default BrandModal