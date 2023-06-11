import React, { useState, useEffect, useContext } from 'react';
import { selectUser } from "../Slices/userSlice";
import { useSelector } from 'react-redux';
import axios, { HttpStatusCode } from "axios";
import { GroupChatContext, getGroupChats } from '../context/ChatContext';
import { toast } from 'react-toastify';
import Modal from './Modal';

const AdminWindow = () => {
    const userInfo = useSelector(selectUser);
    const [modal, setModal] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const { curChat, setCurChat, setAllChats } = useContext(GroupChatContext);

    useEffect(() => {
    }, []);
    const leaveRoom = async () => {
        try {
            const groupLeave = await axios.delete(
                `${process.env.BACK_URL}/transcendence/chat/group/delete/${userInfo.user.id}/${curChat.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    },
                }
            );
            toast.info(`You leave ${curChat.name}`, {
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "colored",
                });
            setCurChat(null);
            getGroupChats()
                .then(chats => setAllChats(chats));
        } catch (ex) {
            console.log("Can't delete chat:", ex);
        }
    };

    const changePass = async (bool) => {
        if (!modal)
            setModal(true);
        else if (!bool) {
            try {
                await axios.post(
                    `${process.env.BACK_URL}/transcendence/chat/group/update-pass/${curChat.id}/${userInfo.user.id}`,
                    { 
                        oldPassword: oldPassword,
                        newPassword: newPassword,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                        },
                    });
                getGroupChats()
                    .then(chats => setAllChats(chats));
                setModal(false);
                toast.info("Password changed!", {
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            theme: "colored",
                    });
            } catch (ex) {
                toast.error(ex.response.data.message, {
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            theme: "colored",
                        });
            }
        } else {
            setModal(false);
        }
    };

    return (
    <>
        {!curChat.public && curChat.admins.some(id => id == userInfo.user.id) && <button onClick={() => changePass(true)} className='text-xl font-bold bg-yellow-500 m-1 rounded-md'>Change Password</button>}
        <button onClick={leaveRoom} className='text-xl font-bold bg-red-500 m-1 rounded-md'>Leave Room </button>
        {modal && <Modal onClose={(bool) => changePass(bool)}> 

         <div className="flex flex-col mb-4">
          <label htmlFor="pass" className="text-lg mb-2 font-medium">
            Old Password:
          </label>
          <input type="text" id="pass" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className="border border-gray-500 p-2 rounded-lg text-black focus:outline-none" />
          <label htmlFor="pass" className="text-lg mb-2 font-medium">
            New Password:
          </label>
          <input type="text" id="pass" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="border border-gray-500 p-2 rounded-lg text-black focus:outline-none" />
        </div> 
        </Modal>}
    </>
    );
};

export default AdminWindow;
