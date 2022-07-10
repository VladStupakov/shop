import styled from "styled-components"
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

const Container = styled.div`
  margin-top: 50px;
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
`;




const Register = () => {

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters long")
      .max(20, "Name must be not longer than 20 characters")
      .required("Name is required"),
    surname: Yup.string()
      .min(2, "Surname must be at least 2 characters long")
      .max(20, "Surname must be not longer than 20 characters")
      .required("Surname is required"),
    email: Yup.string().email().required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})', 'Password must be at least 8 characters long and contain at one lower and upper case letter and a number ')
  });

  const initialValues = {
    name: "",
    surname: "",
    email: "",
    password: "",
  };

  const onSubmit = (values) => {
    
  };

  const renderError = (message) => <p>{message}</p>;

  return (
    <Container>
      <Wrapper>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            onSubmit(values);
            resetForm();
          }}
        >
          <Form>
            <div
              style={{
                width: "60%",
              }}
            >
              <div>
                <label htmlFor="name">
                  Name
                </label>
                <div>
                  <Field
                    name="name"
                    type="text"
                    className="input"
                    placeholder="Name"
                  />
                  <ErrorMessage name="name" render={renderError} />
                </div>
              </div>
              <div>
                <label className="label" htmlFor="surname">
                  Surname
                </label>
                <div>
                  <Field
                    name="surname"
                    type="text"
                    className="input"
                    placeholder="Surname"
                  />
                  <ErrorMessage name="surname" render={renderError} />
                </div>
              </div>
              <div>
                <label  htmlFor="email">
                  Email address
                </label>
                <div>
                  <Field
                    name="email"
                    type="text"
                    className="input"
                    placeholder="Email address"
                  />
                  <ErrorMessage name="email" render={renderError} />
                </div>
              </div>
              <div>
                <label  htmlFor="password">
                  Password
                </label>
                <div>
                  <Field
                    name="password"
                    type="text"
                    className="input"
                    placeholder="Password"
                  />
                  <ErrorMessage name="password" render={renderError} />
                </div>
              </div>
              <button type="submit">
                Submit
              </button>
            </div>
          </Form>
        </Formik>
      </Wrapper>
    </Container>
  );
};

export default Register