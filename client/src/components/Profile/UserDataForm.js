import React from 'react'
import styled from 'styled-components'
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { registrationSchema } from "../../schemas/validationSchemas.js";
import { Button, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserData } from '../../API/UserApi.js';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
`
const InputContainer = styled.div`
  margin-bottom: 20px;
`

const Input = styled(TextField)`
  width: 100%;
`

const RegistrationError = styled.div`
  margin-top: 10px;
  color: red;
`

const UserDataForm = ({ user }) => {

    const error = useSelector(state => state.user.error)

    const dispatch = useDispatch()

    const formSubmit = (data) => {
        updateUserData(dispatch, {...data, id: user._id})            
    }

    const formik = useFormik({
        initialValues: {
            name: user.name,
            surname: user.surname,
            email: user.email,
            password: ''
        },
        validationSchema: registrationSchema,
        onSubmit: formSubmit
    })

    return (
        <>
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
                    <Input
                        id="surname"
                        name="surname"
                        label="Surname"
                        value={formik.values.surname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.surname && Boolean(formik.errors.surname)}
                        helperText={formik.touched.surname && formik.errors.surname}
                        autoComplete="off"
                    />
                </InputContainer>
                <InputContainer>
                    <Input
                        id="email"
                        name="email"
                        label="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        autoComplete="off"
                    />
                </InputContainer>
                <InputContainer>
                    <Input
                        id="password"
                        name="password"
                        label="Password"
                        type='password'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                </InputContainer>
                <Button variant="contained" type='submit'>
                    Save
                </Button>
                <RegistrationError>{error}</RegistrationError>
            </Form>
        </>
    )
}

export default UserDataForm