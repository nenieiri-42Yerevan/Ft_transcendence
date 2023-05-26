import {
    createContext,
    useContext,
    useReducer,
  } from "react";

  import React from 'react'
  
  export const ChatContext = createContext();
  
  export const ChatContextProvider = ({ children }) => {
    const INITIAL_STATE = {
      ChannelId: "null",
      chats: {},
    };
  
    const chatReducer = (state, action) => {
      switch (action.type) {
        case "CHANGE_CHATS":
          return {
            chats: action.payload,
          };
          case "CHANGE_ID":
            return {
                ChannelId: action.payload,
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