import React, { useEffect, useState, useContext } from 'react'
import { getAvatar, selectUser } from '../Slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import avatar from "@SRC_DIR/assets/images/avatar.png";
import { Link } from "react-router-dom";
import { GameContext } from "../context/GameSocket";
import { io } from 'socket.io-client';

const ChatUsers = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userInfo = useSelector(selectUser);
    const [photo, setphoto] = useState<string>('');
    const { info, gameSocket, notify } = props;
    const { setPlayerId, setInvite } = useContext(GameContext);
    const [userId, setUserId] = useState(null);
    useEffect(() => {
        console.log(notify);
        const getPhoto = async () => {
            const photo = await getAvatar(1, navigate, dispatch, info.id);
            if (photo) {
                setphoto(photo);
            }
        }
        getPhoto();
    }, [])

    useEffect(() => {
        if (props.info.id == userId)
        {
            gameSocket?.on('room', (data) => {
                console.log('Invite to roo : ', data);
                setPlayerId(0);
                setInvite(true);
                notify?.emit('message', { id: props.info.id, message: data, opponent: userInfo.user}); 
            });
        }
        return(()=>{
            gameSocket?.off('room');
        })
    }, [notify, gameSocket, userId])

    const sendInvite = (id) => {
        setUserId(id);
        if (props.info.id == id)
            gameSocket?.emit("join-room");
    }
    
    return (
        <>
            <Link
                to={`/transcendence/user/chat/${info.id}`}
                className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out cursor-pointer hover:bg-[#616161] focus:outline-none">
                <img className="object-cover w-10 h-10 rounded-full"
                    src={photo ? photo : avatar} alt="username" />
            </Link>
            <div className="w-full pb-2 border-[#393939]">
                <div className="flex justify-between">
                    <span className="block ml-2 font-semibold text-white">{info.first_name + " " + info.last_name}</span>
                </div>
                <span className="block ml-2 font-semibold text-white">{info.username}</span>
                <span className="block ml-2 font-semibold text-red-500">{info.blocked.includes(props.currentId) && "This user blocked you"}</span>
                <Link to={`/transcendence/user/profile/${info.id}`} className="block ml-2 font-semibold text-white ">Profile</Link>
                <button onClick={()=>{sendInvite(info.id)}} className="bg-[#1e81b0] p-1 m-2 w-40">Game Invite</button>
                <hr />           
            </div>
        </>
    )
}

export default ChatUsers;
