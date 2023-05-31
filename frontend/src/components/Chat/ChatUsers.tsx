import React, { useEffect, useState } from 'react'
import { getAvatar } from '../Slices/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import avatar from "@SRC_DIR/assets/images/avatar.png";
import { Link } from "react-router-dom";

const ChatUsers = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [photo, setphoto] = useState<string>('');
    const { info } = props;
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
        <>
            <a
                href={`/transcendence/user/chat/${info.id}`}
                className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b cursor-pointer hover:bg-[#616161] focus:outline-none">
                <img className="object-cover w-10 h-10 rounded-full"
                    src={photo ? photo : avatar} alt="username" />
            </a>
            <div className="w-full pb-2 border-[#393939]">
                <div className="flex justify-between">
                    <span className="block ml-2 font-semibold text-white">{info.first_name + " " + info.last_name}</span>
                </div>
                <span className="block ml-2 font-semibold text-white">{info.username}</span>
                <Link to={`/transcendence/user/profile/${info.id}`} className="block ml-2 font-semibold text-white">Profile</Link>
            </div>
        </>
    )
}

export default ChatUsers;