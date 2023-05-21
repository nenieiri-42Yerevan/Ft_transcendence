import axios from "axios";
import React, { useState, useEffect } from "react";

const Messages = ()=>{

    return (
        <div className="relative w-full p-6 overflow-y-auto h-[40rem]">
              <ul className="space-y-2">
                <li className="flex justify-start">
                  <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                    <span className="block">Hi</span>
                  </div>
                </li>
              </ul>
            </div>
    )


};

export default Messages;