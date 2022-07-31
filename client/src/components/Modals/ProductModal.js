import React, { useState } from 'react'
import { useFormik } from 'formik';
import { Box, Button, InputLabel, MenuItem, Modal, Select, TextareaAutosize, TextField } from '@mui/material';
import styled from 'styled-components';
import { useEffect } from 'react';
import { productSchema } from '../../schemas/validationSchemas';
import { useSelector } from 'react-redux';
import { createProduct, updateProduct } from '../../API/ProductApi';


const CreateProductFormContainer = styled(Box)`
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
  font-size: 20px;
`

const ResponseError = styled.div`
  margin-top: 10px;
  color: red;
`

const TextArea = styled(TextareaAutosize)`
    display: flex;
    width: 100%;
    resize: none;
    font-size: 20px;
`

const CategoriesSelect = styled(Select)`
    min-width: 100px;
`

const ImagePreview = styled.img`
    margin: 10px auto;
    width: 70%;
    height: auto;
`

const ProductModal = ({ openProductModal, setOpenProductModal, isProductEdit, setIsProductEdit, selectedProduct, brands, setUpdateProductsList }) => {

    const categories = useSelector(state => state.filters.categories)
    const [responseError, setResponseError] = useState()
    const [image, setImage] = useState()
    const [uploadNewImage, setUploadNewImage] = useState(false)

    const closeModal = () => {
        setUpdateProductsList(prevState => prevState += 1)
        setIsProductEdit(false)
        setOpenProductModal(false)
        setUploadNewImage(false)
        formik.resetForm()
    }

    const formSubmit = (data) => {
        createProduct(data)
            .then(response => {
                response.error ?
                    setResponseError(response.data.error)
                    :
                    closeModal()
            })
    }

    const editProduct = (data) => {
        updateProduct(selectedProduct._id, data)
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
            description: '',
            brand: '',
            categories: '',
            price: '',
            quantity: '',
            img: null
        },
        validationSchema: productSchema,
        onSubmit: isProductEdit ? editProduct : formSubmit,
    })

    const UploadedImage = ({ img }) => {

        if (!img)
            return null
        if (uploadNewImage) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result)
            };
            reader.readAsDataURL(img)
        }

        return (
            <ImagePreview
                src={image}
                alt={formik.values.img.name}
            />
        )

    }

    const setFormValues = () => {
        formik.setFieldValue('name', selectedProduct.name)
        formik.setFieldValue('description', selectedProduct.description)
        formik.setFieldValue('brand', selectedProduct.brand)
        formik.setFieldValue('categories', selectedProduct.categories)
        formik.setFieldValue('price', selectedProduct.price)
        formik.setFieldValue('quantity', selectedProduct.quantity)
        formik.setFieldValue('img', selectedProduct.img)
        setImage(process.env.REACT_APP_API_URL + selectedProduct.img)
    }

    useEffect(() => {
        isProductEdit && setFormValues() 
    }, [isProductEdit])

    return (
        <Modal
            open={openProductModal}
            onClose={closeModal}
        >
            <CreateProductFormContainer>
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
                        <TextArea minRows={3}
                            id="description"
                            name="description"
                            label="Description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            autoComplete="off"
                        />
                    </InputContainer>
                    <InputContainer>
                        <InputLabel id="brands-label">Brand</InputLabel>
                        <CategoriesSelect
                            id="brand"
                            name="brand"
                            labelId="brands-label"
                            value={formik.values.brand}
                            onChange={formik.handleChange}
                            autoComplete="off"
                        >
                            {
                                brands?.map(brand => {
                                    return (
                                        <MenuItem key={brand._id} value={brand._id}>{brand.name}</MenuItem>
                                    )
                                })
                            }
                        </CategoriesSelect>
                    </InputContainer>
                    <InputContainer>
                        <InputLabel id="categories-label">Category</InputLabel>
                        <CategoriesSelect
                            id="categories"
                            name="categories"
                            labelId="categories-label"
                            value={formik.values.categories}
                            onChange={formik.handleChange}
                            autoComplete="off"
                        >
                            {
                                categories.map(category => {
                                    return (
                                        <MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>
                                    )
                                })
                            }
                        </CategoriesSelect>
                    </InputContainer>
                    <InputContainer>
                        <Input
                            id="price"
                            name="price"
                            label="Price, UAH"
                            value={formik.values.price}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.price && Boolean(formik.errors.price)}
                            helperText={formik.touched.price && formik.errors.price}
                            autoComplete="off"
                        />
                    </InputContainer>
                    <InputContainer>
                        <Input
                            id="quantity"
                            name="quantity"
                            label="Quantity"
                            value={formik.values.quantity}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                            helperText={formik.touched.quantity && formik.errors.quantity}
                            autoComplete="off"
                        />
                    </InputContainer>
                    <InputContainer>
                        <input
                            id="file"
                            name="file"
                            type="file"
                            onChange={e => {
                                setUploadNewImage(true)
                                formik.setFieldValue("img", e.currentTarget.files[0]);
                            }}
                        />
                    </InputContainer>
                    <UploadedImage img={formik.values.img} />
                    {
                        isProductEdit ?
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
            </CreateProductFormContainer>
        </Modal>
    )
}

export default ProductModal