import React, {useEffect} from 'react';
import { Form } from 'react-final-form';
import { Link, useNavigate } from 'react-router-dom';
import { FORM_ERROR } from 'final-form';
import { Data, EditInfo, validateSettings } from '../Utils/Scheme';
import Background from '../Background';
import axios from 'axios';
import FormEdit from '../Form/FormEdit';
import { useDispatch, useSelector } from 'react-redux';
import {enable2fa, disable2fa, getUserInfo, selectUser, setUserInfo, updatePass, updateUser} from '../Slices/userSlice';
import { useState } from "react";
import Tfa from '../Tfa';
import Profilemenu from './Profilemenu';


const Edit = ({notify}) => {
    const userInfo = useSelector(selectUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [enabled, setEnabled] = useState(false);
    

    useEffect(() => {
        if (userInfo && !userInfo.user)
            navigate("/transcendence/user/signin");
    }, [])
    const initialValues = {
        first_name: userInfo?.user?.name,
        last_name: userInfo?.user?.lastName,
        username: userInfo?.user?.username,
      };
    const onSubmit = async (data: EditInfo) => {
        const sendData = {
            first_name: data.first_name,
            last_name: data.last_name,
            username: data.username,
        };
        try {
            await updateUser(dispatch, navigate, sendData, userInfo.user.id);
            if (data.new_password !== undefined && data.cur_password !== undefined) {
                await updatePass(dispatch, navigate, data, userInfo.user.id);
            }
            if (data.tfa == 'enable')
            {
                await enable2fa(dispatch, navigate, userInfo.user);
            }
            else
            {
                await disable2fa(dispatch, navigate, userInfo.user);
            }
            setEnabled(true);
            dispatch(setUserInfo(await getUserInfo(navigate, dispatch)));
        } catch (error: any) {
        return { [FORM_ERROR]: error.response.data.message };
        }
    };
    const handleEnableChange = (value: boolean) => {
        setEnabled(value);
      }
    return (
        <>
        <Profilemenu notify = {notify}/>
        <div className=" text-xs xl:text-x lg:text-lg md:text-md sm:text-sm bg-[#262525] flex justify-center">
            <div className="flex flex-col justify-center md:text-lg items-center min-w-full min-h-screen md:min-w-fit ">
                {enabled && <Tfa user = {userInfo.user}  enabled={enabled}  onEnableChange={handleEnableChange}/>}
                <Form onSubmit={onSubmit} validate={validateSettings} render={FormEdit}  initialValues={initialValues}/>
            </div>
        </div>
        </>
    );
    };

    export default Edit;
