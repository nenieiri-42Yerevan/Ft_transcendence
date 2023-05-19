import React from 'react'
import Signmenu from './Signmenu';
import Login from './Login';
import Form2fa from './Form/Form2fa';
import { selectUser } from './Slices/userSlice';
import Form2fa42 from './Form/Form2fa42';


const Tfa_42 = () => {
    const submit42 = ()=>{
        
    }
    return (
        <>
            <Signmenu />
            <Login onSub={submit42} rend={Form2fa42} />
        </>
    );
}

export default Tfa_42;