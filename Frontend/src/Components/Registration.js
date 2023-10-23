import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import "../Styles/Registration.css"
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function Registration() {
   const navigate = useNavigate()

    let initialValues = {
        name: "",
        email: "",
        password: ""
    }

    const validationSchema = yup.object().shape({
        name: yup.string().required("Please Enter Your Name"),
        email: yup.string().required("Please Enter Your Email").email("Please enter valid Email"),
        password: yup.string().min(8, "password must be 8 character long").required("Please Enter Your Password")
    })

    const handleSubmit = ( values , {resetForm} ) => {
        const Data = {
           name : values.name, 
           email: values.email,
           password : values.password 
        } 
        resetForm() 

        axios.post("http://localhost:3000/zaid" , Data) 
        .then((res)=>{
            toast.success("Registered Successfully")
            navigate("/")
        }).catch((err)=>{
            toast.error("Failed to Resgistered")
        })
    }
    
    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} >
            <div className='main'>
            <Form className='d-flex align-items-center'>
                <div className='container w-50'>
                    <div className='formHeading p-1'>
                        <h2>Registration Form</h2>
                    </div>
                    <div className='mainWrapper text-center'>
                        <div className='inputFields'>
                            <Field className="form-control my-2 d-block w-75 mx-auto" type="text" name="name" placeholder='Enter Your Name' />
                            <p className='warning text-danger m-0'>
                                <ErrorMessage name="name" />
                            </p>
                            <Field className="form-control my-4 d-block w-75 mx-auto" type="email" name="email" placeholder='Enter Your Email' />
                            <p className='warning text-danger m-0'>
                                <ErrorMessage name="email" />
                            </p>
                            <Field className="form-control my-4 d-block w-75 mx-auto" type="password" name="password" placeholder='Enter Your Password' />
                            <p className='warning text-danger m-0'>
                                <ErrorMessage name="password" />
                            </p>
                        </div>
                        <button type = "submit" className='btn loginBtn px-5 my-2'>Register</button>
                    </div>
                </div>
            </Form>
            </div>
        </Formik>
    )
}

export default Registration
