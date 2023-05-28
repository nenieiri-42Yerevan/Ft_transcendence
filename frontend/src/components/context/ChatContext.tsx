import {
  createContext,
  useContext,
  useReducer,
  useEffect,
} from "react";

import React from 'react'
import axios from 'axios';
import { io } from 'socket.io-client';

export const ChatContext = createContext();

const socketOptions = {
  transportOptions: {
      polling: {
          extraHeaders: {
              authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
          },
      },
  }
};

export const chatSocket = io(`http://localhost:7000/chat`, socketOptions);

  export const ChatContextProvider = ({ children }) => {
    const storedState = localStorage.getItem('chatContextState');
  const INITIAL_STATE = storedState ? JSON.parse(storedState):{
      info: {},
      chat: [],
    };
  
    const chatReducer = (state, action) => {
      switch (action.type) {
        case "CHANGE_INFO":
          return {
            ...state,
            info: action.payload,
          };
        case "CHANGE_CHAT":
          const chatId = action.payload.id;
          const existingChat = state.chat.find(chat => chat.id === chatId);
          if (existingChat) {
            return state;
          } else {
          return {
            ...state,
            chat: [...state.chat, action.payload],
          };
        }
        default:
          return state;
      }
    };
  
    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
    
    useEffect(() => {
      localStorage.setItem('chatContextState', JSON.stringify(state));
      return () => {
        localStorage.removeItem('chatContextState');
      };
    }, [state]);


    return (
      <ChatContext.Provider value={{ data:state, dispatch }}>
        {children}
      </ChatContext.Provider>
    );
  };