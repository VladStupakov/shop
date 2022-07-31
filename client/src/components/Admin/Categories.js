import { Button, IconButton, TextField } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { useEffect } from 'react';
import { createCategory, deleteCategory, fetchCategories, updateCategory } from '../../API/ProductApi';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin: 10px;;
  justify-content: center;
`

const Category = styled.div`
  display: flex;
  font-size: 20px;
  margin: 20px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 12px;
  align-items: center;
  width: 80%;
`

const CategoryName = styled(TextField)`
  display: flex;
  flex: 3;
  margin-left: 10px;
`

const EditCategoryIcons = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
`

const CustomIconButton = styled(IconButton)`
  
`

const CustomButton = styled(Button)`
    display: flex;
    margin-left: 10px;  
`

const CreateCategoryContainer = styled.div`
    border-bottom: 2px solid lightgrey;
    padding: 20px;
    margin-right: 10px;
    display: flex ;
    flex-direction: column;
    align-items: center;
    max-height: 500px;
`

const CreateCategory = styled.div`
    font-size: 26px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    text-align: center;
`

const CreateInput = styled(TextField)`
    display: flex;
    flex: 3;
`

const ImagePreview = styled.img`
    margin: 10px auto;
    width: auto;   
    height: auto;
    max-width: 100px;
    max-height: 100px;
    display: flex;
`
const Row = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const Categories = () => {

    const [categories, setCategories] = useState()
    const [activeInput, setActiveInput] = useState('')
    const [createInputValue, setCreateInputValue] = useState()
    const [imageData, setImageData] = useState()
    const [image, setImage] = useState()
    const [updateCategoriesList, setUpdateCategoriesList] = useState(0)

    useEffect(() => {
        fetchCategories()
            .then(response => setCategories(response))
    }, [updateCategoriesList])

    const handleCategoryUpdate = () => {
        updateCategory(activeInput.id, activeInput.target.value)
            .then(response => {
                setActiveInput('')
            })
    }

    const handleCreateInput = (e) => {
        setCreateInputValue(e.target.value)
    }

    const handleCategoryCreate = () => {
        createCategory({name: createInputValue, img: imageData})
        .then(() =>{
            setUpdateCategoriesList(prevState => prevState += 1)
            setCreateInputValue('')
            setImageData(null)
        })
    }

    const UploadedImage = ({ img }) => {
        if (!img)
            return null
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result)
        };
        reader.readAsDataURL(img)

        return (
            <ImagePreview
                src={image}
            />
        )

    }

    const handleDeleteCategory = (id) =>{
        deleteCategory(id)
        .then(()=>{
            setUpdateCategoriesList(prevState => prevState += 1)
        })
    }

    return (
        <Container>
            <CreateCategoryContainer>
                <Row>
                    <CreateCategory>Create category</CreateCategory>
                    <CreateInput onChange={handleCreateInput} value={createInputValue}/>
                    <input
                        id="file"
                        name="file"
                        type="file"
                        onChange={e => {
                            setImageData(e.currentTarget.files[0])
                        }}
                    />
                    <CustomButton variant='contained' onClick={handleCategoryCreate} sx={{ margin: '0 10px', height: '100%' }} >
                        Create
                    </CustomButton>
                </Row>
                <UploadedImage img={imageData} />
            </CreateCategoryContainer>
            {
                categories?.map(category => {
                    return (
                        <Category key={category._id} >
                            <CategoryName defaultValue={category.name} onFocus={(e) => setActiveInput({ target: e.target, id: category._id })} />
                            <EditCategoryIcons>
                                <CustomButton variant='contained' onClick={handleCategoryUpdate} disabled={activeInput.id !== category._id}>
                                    Save
                                </CustomButton>
                                <CustomIconButton sx={{ margin: '0 10px' }} onClick={() => handleDeleteCategory(category._id)}>
                                    <DeleteIcon />
                                </CustomIconButton>
                            </EditCategoryIcons>
                        </Category>
                    )
                })
            }
        </Container>
    )
}

export default Categories