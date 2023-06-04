import React from "react";
import logo from "@SRC_DIR/assets/images/pink.svg"

const footer = ()=>{
    return (
    <div className="bg-py-4 text-2xl">
        <div className="container mx-auto px-4">
            <div className="text-gray-400 text-center">
                <img className = "mx-auto w-32" src={logo} alt="logo" />
                Ft_transcendence last commone core project
                <h1 className="text-[#1E81B0]">The Team</h1>
                <div className="flex flex-row justify-center">
                    <p className="m-2">Vismaily </p>
                    <p className="m-2">Nathaniel </p>
                    <p className="m-2">arastepa </p>
                    <p className="m-2">Rstephan </p>
                </div>
            </div>
            <p className="text-center text-gray-400 text-sm">
            &copy; 2023 My Website. All rights reserved.
            </p>
        </div>
    </div>);
}

export default footer;