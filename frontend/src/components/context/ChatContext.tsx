import {
  createContext,
  useContext,
  useReducer,
  useEffect,
} from "react";

import React from 'react'
import axios from 'axios';
export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const storedState = sessionStorage.getItem('chatContextState');
  const INITIAL_STATE =  storedState ? JSON.parse(storedState) : {
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
    sessionStorage.setItem('chatContextState', JSON.stringify(state));
    return () => {
      sessionStorage.removeItem('chatContextState');
    };
  }, [state]);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};