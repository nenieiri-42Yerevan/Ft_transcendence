import React from 'react'

const Tfa = (props)=>{
    return (
        <div className="w-full flex justify-center items-center mb-2">
            <div className="bg-[#201F1F] text-white font-bold rounded-full h-8 w-8 flex justify-center items-center cursor-pointer" onClick={() => props.onEnableChange(false)}>X</div>
            <div className="bg-[#201F1F] text-white rounded-md p-4 text-center w-full">{props && props.user && props.user.TFA_enabled ? "your TFA secret is " + props.user.TFA_secret : "TFA is disabled"}</div>
        </div>
    );
}

export default Tfa;