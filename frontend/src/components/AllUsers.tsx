import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import pong from "@SRC_DIR/assets/images/pong.png";
import Navigation from './NavBar';
import Userlist from './Userlist';
import { filterItems, getUsers, selectUser } from './Slices/userSlice';

const AllUsers = () => {
    const [query, setQuery] = useState('');
    const userInfo = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [res, setRes] = useState(null);
    useEffect(()=>{
        if (userInfo && !userInfo.user)
            navigate("/transcendence/user/signin");
        const getAll = async()=>{
            const res = await getUsers(navigate, dispatch);
            setUsers(res);
        }
        if (users.length == 0)
            getAll();
        setRes(filterItems(query, users));
    }, [query, users])

    return (
        <>
        <Navigation/>
        <div className="flex min-h-full flex-col bg-[#262525]">
            <input type="search" className="block w-80 py-2 pl-10 text-white bg-[#262525] border border-[#D1D5DB] rounded outline-none" name="search"
                placeholder="Search" onChange={e => setQuery(e.target.value)} required />
            <div className="w-full min-h-full my-2 bg-[#1E1E1E] border-[#393939] border-solid border p-8 rounded">
                <h2 className="font-bold text-2xl text-white text-center  flex justify-between"><img className="w-[2em]" src={pong}></img>Users</h2>
                <hr />
                {res ? res.map((obj, index: number) =>(
                    <Userlist index={index} obj={obj} key={index} />
                )) : users && users.map((obj, index: number) => (
                    <Userlist index={index} obj={obj} key={index} />
                ))}
                <p className="text-white text-center p-5   font-bold  hover:bg-[#616161]">{users && users.length === 0 && "No Data"} </p>
            </div>
        </div>
        </>
        )
}

export default AllUsers;