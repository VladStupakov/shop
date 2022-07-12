import styled from "styled-components"
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { loginSchema } from "../schemas/validationSchemas";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { login } from "../API/UserApi";

const Container = styled.div`
  height: 95vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://www.gamespot.com/a/uploads/screen_kubrick/1551/15511094/3667472-gaming-pc-build-2020--how-to-build-a-gaming-pc-from-scratch-promothumb2.jpg")
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

const FormTitle = styled.h2`
  
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

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {

    const [showPassword, setShowPassword] = useState(false)
    const dispatch = useDispatch()

    const formSubmit = (user) => {
      login(dispatch, user)
    }
  
    const formik = useFormik({
      initialValues,
      validationSchema: loginSchema,
      onSubmit: formSubmit
    });
  
    const handleClickShowPassword = () =>{
      setShowPassword(prevState => !prevState)
    }
  
    return (
      <Container>
        <Wrapper>
          <FormTitle>
            Login
          </FormTitle>
          <Form onSubmit={formik.handleSubmit}>
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
            <SubmitButton color="primary" variant="contained" type="submit">
              Submit
            </SubmitButton>
          </Form>
        </Wrapper>
      </Container>
    );
}

export default Login