import  React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {selectUser} from './Slices/userSlice';
import axios from "axios";

const Profilemenu = () => {
    const userInfo = useSelector(selectUser);
    const dispatch = useDispatch();

    const getChats = async () => {
        try {
            const res = await axios.get(`http://localhost:7000/transcendence/chat/${userInfo.id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
                  }
              });
            console.log(res);
            
        }
        catch(error: any)
        {

        }
    }
    return (
        <>
            <nav className="flex justify-between w-full py-2 px-4 bg-[#9e9c9c33] text-white fixed top-0 left-0 z-10">
                <ul className="flex space-x-4">
                    <li>
                        <Link to="#">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="#">Friends</Link>
                    </li>
                    <li>
                        <Link to="#" onClick={getChats}>Chat</Link>
                    </li>
                    <li>
                        <Link to="#">Game</Link>
                    </li>
                </ul>
            </nav>
        </>
    );

}

export default Profilemenu;