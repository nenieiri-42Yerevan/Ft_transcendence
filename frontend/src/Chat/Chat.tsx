import axios from "axios";
import React, { useState } from "react";

import { Link } from "react-router-dom";

const Chat = () => {
    const chats = [
        {user: "user1"},
        {user: "user2"},
        {user: "user3"},
        {user: "user4"},
        {user: "user4"},
        {user: "user5"},
        {user: "user6"},
        {user: "user7"},
        {user: "user8"},
    ];

    return (
        <div className="flex flex-col h-screen">
            <div className="bg-black/90 w-fullflex-shrink-0">
                <nav className="flex flex-row mt-10">
                <Link to="#" className="text-gray-400 hover:text-white py-2 px-4 ">New Chat</Link>
                {
                    chats && chats.map((elem, index)=>(
                        <a href="#" className="text-gray-400 hover:text-white py-2 px-4">{elem.user}</a>
                ))}
                </nav>
            </div>
            <div className="flex-1 flex flex-col bg-black/90 border border-black">
                <header className="bg-black shadow py-6 px-4">
                    <h1 className="text-3xl text-white font-bold">Chat</h1>
                </header>
                <main className="flex-1 p-4">
                </main>
            </div>
        </div>
    );
};

export default Chat;

