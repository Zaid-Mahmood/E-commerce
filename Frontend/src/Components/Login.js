import React from 'react'
import * as yup from 'yup';
import "../Styles/Registration.css";
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate()
    let initialValues = {
        email: "",
        password: ""
    }

    const validationSchema = yup.object().shape({
        email: yup.string().required("Please Enter Your Email").email("Please enter valid Email"),
        password: yup.string().min(8, "password must be 8 character long").required("Please Enter Your Password")
    })
    const handleSubmit = (values) => {
        let Data = {
            email: values.email,
            password: values.password
        }
        axios.get("http://localhost:3000/zaid")
            .then((response) => {
                let responseData = (response.data)
                let matchedData = responseData.find(response => response.email === Data.email && response.password === Data.password)
                if (matchedData) {
                    toast.success("Successfully Logged")
                    navigate("/home")
                } else {
                    toast.error("Invalid Credentials")
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }


    return (
        <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={handleSubmit}>
            <div className='main'>
                <Form className='d-flex align-items-center'>
                    <div className='container w-50'>
                        <div className='formHeading p-1'>
                            <h2>Login Form</h2>
                        </div>
                        <div className='mainWrapper text-center'>
                            <div className='inputFields'>
                                <Field className="form-control my-4 d-block w-75 mx-auto" name="email" type="email" placeholder='Enter Your Email' />
                                <p className='text-danger'>
                                    <ErrorMessage name="email" />
                                </p>
                                <Field className="form-control my-4 d-block w-75 mx-auto" name="password" type="password" placeholder='Enter Your Password' />
                                <p className='text-danger'>
                                    <ErrorMessage name="password" />
                                </p>
                            </div>
                            <button type="submit" className='btn loginBtn px-5 my-2'>Login</button>
                            <Link className='btn registerBtn px-5 my-2 mx-2' to={"/register"} >New User</Link>
                        </div>
                    </div>
                </Form>
            </div>
        </Formik>
    )
}

export default Login
