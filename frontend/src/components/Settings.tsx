import React from 'react';
import { Form } from 'react-final-form';
import { useNavigate } from 'react-router-dom';
import { FORM_ERROR } from 'final-form';
import { Data, EditInfo, validateSettings } from './Utils/Scheme';
import Background from './Background';
import axios from 'axios';
import FormEdit from './Form/FormEdit';
import { useDispatch, useSelector } from 'react-redux';
import {selectUser} from './Slices/userSlice';

const Edit = () => {
    const userInfo = useSelector(selectUser);
    const navigate = useNavigate();
    const initialValues = {
        first_name: userInfo.user.name,
        last_name: userInfo.user.lastName,
        email: userInfo.user.email,
      };
    const onSubmit = async (data: EditInfo) => {
        const sendData = {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
        };
        console.log(data);
        try {
            const response = await axios.put(
                `http://localhost:7000/transcendence/user/update-user/${userInfo.id}`, 
                {
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email,
                },
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
                    },
                },
            );
        } catch (error: any) {
        return { [FORM_ERROR]: error.response.data.message };
        }
    };
    return (
        <>
        <div className="  py-0 md:py-6 text-xs xl:text-xl gap-x-0 md:gap-x-4 lg:text-lg md:text-md sm:text-sm backdrop-blur-md p-0 lg:p-2 xl:p-3 bg-black/50 min-w-full min-h-full z-[668] absolute flex justify-center bg-clip-padding">
            <div className="flex justify-center md:text-lg items-center min-w-full min-h-screen md:min-w-fit md:min-h-fit">
            <Form onSubmit={onSubmit} validate={validateSettings} render={FormEdit}  initialValues={initialValues}/>
            </div>
        </div>
        <Background />
        </>
    );
    };

    export default Edit;
