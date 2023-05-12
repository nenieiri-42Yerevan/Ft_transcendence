import React from "react"
import { Link } from "react-router-dom";


const Signmenu = ()=>{

    return (
        <>
          <nav className="flex justify-between w-full py-2 px-4 bg-[#1E1E1E] text-white">
            <ul className="flex gap-4">
              <li>
                <Link to="/transcendence">Welcome Page</Link>
              </li>  
            </ul>
          </nav>
        </>
      );
}

export default Signmenu;