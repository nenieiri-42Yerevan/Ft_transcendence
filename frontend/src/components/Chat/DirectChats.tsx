import React, {useContext} from 'react'
import Navigation from '../NavBar';
import Header from './Header';
import Users from './Users';
import { ChatContext } from '../context/ChatContext';


const DirectChats = () =>{
    const { data } = useContext(ChatContext);
    return (
        <>
        <Navigation />
        <div className="container bg-[#262525]">
          <div className="min-w-full border rounded lg:grid lg:grid-cols-3">
            <div className="border-r border-[#393939] lg:col-span-1">
              <Header />
              <Users data={data.chat} />
            </div>
            <div className="hidden lg:col-span-2 lg:block">
              <div className="w-full">
              </div>
            </div>
          </div>
        </div>
        </>
      )
}

export default DirectChats;