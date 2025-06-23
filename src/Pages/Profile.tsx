import React, { useContext, useEffect, useState } from "react";
import { Navbar } from "../Components/Navbar";
import { ThemeContext } from "../Components/context/FilmProvider";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { User } from "../types/types";
import { Body } from "../Components/Body";


export const Profile: React.FC = () => {
    const { user, setUser } = useContext(ThemeContext);
    const [showToast, setShowtoast] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {   
        if (!user) {
          navigate('/');
        }
    }, [user, navigate]);

    const initialValues = {
        name: user.name ?? '',
        email: user.email ?? '',
        username: user.username ?? '',
    }

    const onSubmit = (values: User) => {
        setUser(values);
        setShowtoast(true);
        setTimeout(() => {
            setShowtoast(false);
        }, 3000);
          
    }

    const ProfileSchema = Yup.object().shape({
        name: Yup.string()
            .min(5, 'Trop court :)')
            .max(50, 'Trop long cette fois !')
            .required('Ce paramètre est requis'),
        email: Yup.string()
            .min(15, 'Trop court :)')
            .max(50, 'Trop long cette fois !')
            .required('Ce paramètre est requis'),
        username: Yup.string()
            .min(4, 'Trop court :)')
            .max(50, 'Trop long cette fois !')
            .required('Ce paramètre est requis'),        
        });

    return (
        <Body>
            <Navbar />
            {showToast ? <div className="toast toast-end">
                <div className="alert alert-success">
                    <span>Modification réussie !</span>
                </div>
            </div> : null}

            <div className="flex flex-col items-center justify-center bg-white">
                <div className="mt-5 mb-3">
                    <h1 className="font-bold italic border-t-4 border-base-100">Modifier mon profil</h1>
                </div>
                <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={ProfileSchema}
                >
            {() => (
                <Form>
                    <legend className="fieldset-legend text-black">Votre nom ?</legend>
                    <Field type="text" 
                        id="name" name="name"
                        placeholder="name" 
                        className="input bg-white block w-[400px] text-xl mt-2 p-10 border-b-4 border-indigo-500" />
                    <ErrorMessage name="name" component="div" className="error" />

                    <legend className="fieldset-legend text-black">Votre email ?</legend>
                    <Field type="text" 
                        id="email" name="email" 
                        placeholder="" 
                        className="input bg-white block w-[400px] text-xl mt-2 p-10 border-b-4 border-indigo-500" />
                    <ErrorMessage name="email" component="div" className="error" />

                    <legend className="fieldset-legend text-black">Votre surnom ?</legend>
                    <Field type="text" 
                        id="username" name="username"
                        placeholder="" 
                        className="input bg-white block w-[400px] text-xl mt-2 p-10 border-b-4 border-indigo-500" />                    
                    <ErrorMessage name="username" component="div" className="error" />

                    <button type="submit" className="btn btn-success mt-5 mb-10">Modifier</button>
                </Form>
            )}
                </Formik>
            </div>    
        </Body>
    )
}
