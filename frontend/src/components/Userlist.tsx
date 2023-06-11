import React, {useEffect, useState} from 'react';
import { getAvatar } from './Slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import avatar from "@SRC_DIR/assets/images/avatar.png";
import { Link } from "react-router-dom";

const FriendsList = (props)=>{
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [photo, setphoto] = useState<string>('');
    const [loaded, setloaded] = useState(false);
    
    useEffect(() => {
        const fetchimage = async()=>{
        const image = await getAvatar(1, navigate, dispatch, props.obj.id);
        if (image)
            setphoto(image);
        }
        fetchimage();
        setloaded(true);
    }, [props.obj.id]);
    return (
        <p key={props.index} className="text-white hover:bg-[#616161] text-center p-2 flex justify-between"><img className="w-[2em]" src={loaded ? (photo ? photo : avatar) : null}></img> <Link className="hover:bg-[#1E81B0] p-2" to= {`/transcendence/user/profile/${props.obj.id}`}>{props.obj.username}</Link></p>
    )


}

export default FriendsList;