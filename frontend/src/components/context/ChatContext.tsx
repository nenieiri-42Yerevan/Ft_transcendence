import {
  createContext,
  useContext,
  useReducer,
  useEffect,
} from "react";

import React from 'react'
import axios from 'axios';
import refreshToken from "../Utils/refreshToken";
import { setIsUnauth } from "../Slices/userSlice";
export const ChatContext = createContext();
export const GroupChatContext = createContext();


export const filterItems = ((query, data, userInfo) => {
  let arr:any[] = [];
  data.map((elem, index) => {
    const info = elem.users.find(el => ( el.id != userInfo.user.id ));
    if (info)
    {
      arr.push(info);
    }
  })
  return (arr.filter((elem) => elem.username.includes(query)));
})

export const getChat = async (id: number, navigate, dispatch) =>{    
  try {
    const response = await axios.get(`${process.env.BACK_URL}/transcendence/chat/user/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
    });
    return (response);
  } catch (error) {
    if (error.response.status == 401)
    {
      if ((await refreshToken()) != 200) {
        dispatch(setIsUnauth(true));
        navigate("/transcendence/user/signin");
      } else {
        getChat(id, navigate, dispatch);
      }
    }
    console.error(`Error making request for object with id ${id}:`, error.message);
    return (null);
  }
}


export const getGroupChats = async () => {
  try {
    const response = await axios.get(`${process.env.BACK_URL}/transcendence/chat/group`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
    });
    return (response.data);
  } catch (error) {
    console.error(`Error making request for group`, error.message);
    return (null);
  }
}

export const ChatContextProvider = ({ children }) => {
  const INITIAL_STATE = {
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

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
