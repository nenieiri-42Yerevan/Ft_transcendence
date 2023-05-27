import {
  createContext,
  useContext,
  useReducer,
} from "react";

import React from 'react'
import axios from 'axios';

export const ChatContext = createContext();

export const getChat = async (id: number) =>{    
    try {
      const response = await axios.get(`${process.env.BACK_URL}/transcendence/chat/${id}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
          }
      });
      return (response);
    } catch (error) {
      console.error(`Error making request for object with id ${id}:`, error.message);
      return (null);
    }
  }

  export const ChatContextProvider = ({ children }) => {
    const INITIAL_STATE = {
      chats: {},
    };
  
    const chatReducer = (state, action) => {
      switch (action.type) {
        case "CHANGE_CHATS":
          return {
            chats: action.payload,
          };
        default:
          return state;
      }
    };
  
    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
    
    


    return (
      <ChatContext.Provider value={{ data:state, dispatch }}>
        {children}
      </ChatContext.Provider>
    );
  };