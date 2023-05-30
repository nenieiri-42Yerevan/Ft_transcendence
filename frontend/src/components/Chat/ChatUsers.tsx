import React, { useEffect, useState } from 'react'
import { getAvatar } from '../Slices/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import avatar from "@SRC_DIR/assets/images/avatar.png";

const ChatUsers = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [photo, setphoto] = useState<string>('');
    const {info} = props;
    useEffect(() => {
        const getPhoto = async () => {
            const photo = await getAvatar(1, navigate, dispatch, info.id);
            if (photo) {
                setphoto(photo);
            }
        }
        getPhoto();
    }, [])
    return (
        <a
            href={`/transcendence/user/chat/${info.id}`}
            className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-[#393939] cursor-pointer hover:bg-[#616161] focus:outline-none">
            <img className="object-cover w-10 h-10 rounded-full"
                src={photo ? photo: avatar} alt="username" />
            <div className="w-full pb-2">
                <div className="flex justify-between">
                    <span className="block ml-2 font-semibold text-white">{info.first_name + " " + info.last_name}</span>
                </div>
                <span className="block ml-2 font-semibold text-white">{info.username}</span>
            </div>
        </a>)
}

export default ChatUsers;