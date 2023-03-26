import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Form } from "react-final-form";
import { FORM_ERROR } from 'final-form'
import {selectUser} from '../Slices/userSlice';
import Modal from "react-modal";
import { Link } from "react-router-dom";
import NewChat from "./NewChat";


const Chat = () => {
    const userInfo = useSelector(selectUser);
    const [isOpen, setIsOpen] = useState(false)
    const chats = [
        {user: "user1"},
        {user: "user2"},
        {user: "user3"},
        {user: "user4"},
        {user: "user4"},
        {user: "user5"},
        {user: "user6"},
        {user: "user7"},
        {user: "user8"},
    ];
    const handleOpenModal = () => {
        setIsOpen(true);
    }
    const handleRequestClose = () => {
        setIsOpen(false)
    }

    const onSubmit = async (data: any) => {

        // const sendData = {
            
        // //   first_name: data.first_name,
        // //   last_name: data.last_name,
        // //   username: data.username,
        // //   email: data.email,
        // //   gender: data.gender,
        // //   password: data.password,
        // //   date_of_birth: data.day + "/" + data.month + "/" + data.year,
        // };
        try {
            const user = await axios
                            .post(`http://127.0.0.1:7000/transcendence/user/by-name/${data.search}`);
            console.log(user);
            
            // const res = await axios
            //                 .post(`/transcendence/chat/create/${userInfo.id}/${user.data}`)
        //   navigate("/transcendence/user/signin")
    
        }
        catch (error: any) {
          return { [FORM_ERROR]: error.response.data.message }
    
        }
      };

    // const newChat = async () => {
    //     axios.post(`/transcendence/chat/create/${userInfo.id}/:tid`)
    // }
    //position: fixed; inset: 0px; background-color: rgba(255, 255, 255, 0.75);
    return (
        <div className="flex flex-col h-screen">
            <div className="bg-black/90 w-full flex-shrink-0">
                <nav className="flex flex-row mt-10">
                    <Link to="#" key={"new_chat"} onClick={handleOpenModal} className="text-gray-400 hover:text-white py-2 px-4 ">New Chat</Link>
                    <Modal
                        isOpen={isOpen}
                        onRequestClose={handleRequestClose}
                        overlayClassName="fixed inset-0 bg-[#504d4dbf] flex flex-col items-center justify-center "
                        className="absolute inset-100/2 max-h-[50%] max-w-[50%] w-full h-full  bg-auto overflow-auto rounded-md   outline-none p-0"
                    >
                        <div className="bg-[#201f1fbf] h-full w-full  flex flex-col">
                            {/* <form action=""></form> */}
                            <Form
                                onSubmit={onSubmit}
                                // validate={validate}
                                render={NewChat}
                            />
                        </div>
                    </Modal>
                    {
                        chats && chats.map((elem, index)=>(
                            <a href="#" key={`user_${index}`} className="text-gray-400 hover:text-white py-2 px-4">{elem.user}</a>
                    ))}
                </nav>
            </div>
            <div className="flex-1 flex flex-col bg-black/90 border border-black">
                <header className="bg-black shadow py-6 px-4">
                    <h1 className="text-3xl text-white font-bold">Chat</h1>
                </header>
                <main className="flex-1 p-4">
                </main>
            </div>
        </div>
    );
};
Modal.setAppElement('#root');
export default Chat;

