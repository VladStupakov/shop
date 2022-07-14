import styled from "styled-components"
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { registrationSchema } from "../schemas/validationSchemas";
import { Button, Checkbox, FormControlLabel, IconButton, InputAdornment, TextField } from '@mui/material'
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../API/UserApi";
import { refreshError } from "../store/userSlice";
import { Link } from "react-router-dom";

const Container = styled.div`
  height: 95vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://www.gamingscan.com/wp-content/uploads/2020/10/pc-component-compatibility.jpg")
      center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h2`
  display: flex;
`

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

const SubmitButton = styled(Button)`

`

const RegistrationError = styled.div`
  margin-top: 10px;
  color: red;
`

const ToLogin = styled(Link)`
  text-decoration: none;
`

const initialValues = {
  name: "",
  surname: "",
  email: "",
  password: "",
  isSeller: false
};

const Register = () => {

  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch()
  const error = useSelector(state => state.user.error)
  const [successRegistration, setSuccessRegistration] = useState()

  const formSubmit = (user) => {
    register(dispatch, user)
      .then(() => setSuccessRegistration(true))
  }

  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    onSubmit: formSubmit
  })

  const handleClickShowPassword = () => {
    setShowPassword(prevState => !prevState)
  }

  useEffect(() => {
    if (error)
      dispatch(refreshError())
  }, [])

  const SuccessfullRegistration = () => {
    return (
      <>
        <Title>You have successfully registered.You can login now</Title>
        <ToLogin to='/login'>
          <Button>LOGIN</Button>
        </ToLogin>
      </>
    )
  }

  return (
    <Container>
      <Wrapper>
        {
          !successRegistration ?
            <>
              <Title>
                Registration
              </Title>
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
                    type={showPassword ? 'text' : 'password'}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='toggle password visibility'
                            onClick={handleClickShowPassword}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </InputContainer>
                <FormControlLabel
                  control={<Checkbox checked={formik.values.isSeller} />}
                  label="Register as a seller"
                  name='isSeller'
                  onChange={formik.handleChange}
                  sx={{ mb: '20px' }}
                />
                <SubmitButton color="primary" variant="contained" type="submit">
                  Submit
                </SubmitButton>
              </Form>
              <RegistrationError>{error}</RegistrationError>
            </>
            :
            <SuccessfullRegistration />
        }
      </Wrapper>
    </Container>
  )
};

export default Register