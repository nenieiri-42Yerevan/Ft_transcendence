import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { Form } from "react-final-form";
import { selectUser, getUserByName } from '../Slices/userSlice';
import Modal from "react-modal";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NewChat from "./NewChat";
import Background from "../Background";


const Chat = () => {
    // Init
    return (
        <>
        {/* //<!-- This is an example component --> */}
        <div className="backdrop-blur-md flex flex-col min-h-full min-w-full bg-black/50 z-[668] absolute">
        <div class="container mx-auto rounded-lg min-h-full">
            {/* <!-- headaer --> */}
            <div class="px-5 py-5 flex justify-between items-center bg-[#1E1E1E] border-b-2">
                <div class="font-semibold text-2xl text-white">GoingChat</div>
                <div class="w-1/2">
                    <input
                        type="text"
                        name=""
                        id=""
                        placeholder="search IRL"
                        class="rounded-2xl bg-gray-100 py-3 px-5 w-full"
                    />
                </div>
                <div
                    class="h-12 w-12 p-2 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center"
                >
                    RA
                </div>
            </div>
            {/* <!-- end header --> */}
            {/* <!-- Chatting --> */}
            <div class="flex flex-row justify-between ">
                {/* <!-- chat list --> */}
                <div class="flex flex-col w-2/5 border-r-2 overflow-y-auto">
                    {/* <!-- search compt --> */}
                    <div class="border-b-2 py-4 px-2 bg-[#1E1E1E]">
                        <input
                            type="text"
                            placeholder="search chatting"
                            class="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
                        />
                    </div>
                    {/* <!-- end search compt --> */}
                    {/* <!-- user list --> */}
                    <div
                        class="flex flex-row py-4 px-2 justify-center items-center border-b-2 bg-[#1E1E1E]"
                    >
                        <div class="w-1/4">
                            <img
                                src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
                                class="object-cover h-12 w-12 rounded-full"
                                alt=""
                            />
                        </div>
                        <div class="w-full">
                            <div class="text-lg font-semibold text-white">Luis1994</div>
                            <span class="text-gray-500">Pick me at 9:00 Am</span>
                        </div>
                    </div>
                    {/* <!-- end user list --> */}
                </div>
                {/* <!-- end chat list --> */}
                {/* <!-- message --> */}
                <div class="w-full px-5 flex flex-col justify-between">
                    <div class="flex flex-col mt-5">
                        <div class="flex justify-end mb-4">
                            <div
                                class="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                            >
                                Welcome to group everyone !
                            </div>
                            <img
                                src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                                class="object-cover h-8 w-8 rounded-full"
                                alt=""
                            />
                        </div>
                    </div>
                    <div class="py-5">
                        <input
                            class="w-full bg-gray-300 py-5 px-3 rounded-xl"
                            type="text"
                            placeholder="type your message here..."
                        />
                    </div>
                </div>
                {/* <!-- end message --> */}
            </div>
        </div>
    </div>
    <Background/>
    </>
)
}
export default Chat;

