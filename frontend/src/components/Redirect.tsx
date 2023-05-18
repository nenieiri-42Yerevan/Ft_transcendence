import React from 'react'
import { useEffect, useNavigate, useDispatch } from 'react';
import Background from './Background';
import Cookies from 'js-cookie';
import { getUserInfo, setUserInfo } from './Slices/userSlice';


const Redirect = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [iserror, setIserror] = useState(false);
    useEffect(() => {
        console.log(Cookies.get());
        sessionStorage.setItem('access_token', Cookies.get('access_token'));
        sessionStorage.setItem('access_token', Cookies.get('refresh_token'));
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        getUserInfo(navigate).then(userInfo=>{
            dispatch(setUserInfo(userInfo));
        })
        .catch(error=>{
            setIserror(true);
        })
        navigate("/transcendence/user/profile");
    }, []);
    return (
        <>
            <div className="backdrop-blur-md flex flex-col min-h-full min-w-full bg-black/50 z-[668] absolute">
                <div>
                    
                </div>
            </div>
            <Background />
        </>
    );


}

export default Redirect;

function useState(arg0: boolean): [any, any] {
    throw new Error('Function not implemented.');
}
