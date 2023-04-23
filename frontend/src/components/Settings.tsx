import React from 'react';
import { Form } from 'react-final-form';
import { Link, useNavigate } from 'react-router-dom';
import { FORM_ERROR } from 'final-form';
import { Data, EditInfo, validateSettings } from './Utils/Scheme';
import Background from './Background';
import axios from 'axios';
import FormEdit from './Form/FormEdit';
import { useDispatch, useSelector } from 'react-redux';
import {enable2fa, disable2fa, getUserInfo, selectUser, setUserInfo} from './Slices/userSlice';
import { useState } from "react";
import Tfa from './Tfa';


const Edit = () => {
    const userInfo = useSelector(selectUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [enabled, setEnabled] = useState(false);
    const initialValues = {
        first_name: userInfo.user.name,
        last_name: userInfo.user.lastName,
        username: userInfo.user.username,
      };
    const onSubmit = async (data: EditInfo) => {
        const sendData = {
            first_name: data.first_name,
            last_name: data.last_name,
            username: data.username,
        };
        if (data.new_password !== undefined) {
            sendData['new_password'] = data.new_password;
          }
        console.log("sata "  ,sendData);
        try {
            const response = await axios.put(
                `http://localhost:7000/transcendence/user/update-user/${userInfo.user.id}`, 
                {
                    sendData
                },
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
                    },
                },
            );
            if (data.tfa == 'enable')
            {
                await enable2fa(dispatch, navigate, userInfo.user);
            }
            else
            {
                await disable2fa(dispatch, navigate, userInfo.user);
            }
            setEnabled(true);
            dispatch(setUserInfo(await getUserInfo(navigate)));
        } catch (error: any) {
        return { [FORM_ERROR]: error.response.data.message };
        }
    };
    const handleEnableChange = (value: boolean) => {
        setEnabled(value);
      }
    return (
        <>
        <div className="  py-0 md:py-6 text-xs xl:text-xl gap-x-0 md:gap-x-4 lg:text-lg md:text-md sm:text-sm backdrop-blur-md p-0 lg:p-2 xl:p-3 bg-black/50 min-w-full min-h-full z-[668] absolute flex justify-center bg-clip-padding">
            <div className="flex flex-col justify-center md:text-lg items-center min-w-full min-h-screen md:min-w-fit md:min-h-fit">
                {enabled && <Tfa user = {userInfo.user}  enabled={enabled}  onEnableChange={handleEnableChange}/>}
                <Form onSubmit={onSubmit} validate={validateSettings} render={FormEdit}  initialValues={initialValues}/>
            </div>
        </div>
        <Background />
        </>
    );
    };

    export default Edit;
