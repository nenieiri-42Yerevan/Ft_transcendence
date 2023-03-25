import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from "axios";
import { useSelector } from 'react-redux';

interface UserInfo {
  username: string;
  name: string;
  lastName: string;
  email: string;
  rank: number;
  names: string[],
  id: number,
  img: string,
  follows: number[],
  chats: object[]
}

export const initialState: UserInfo = {
  username: '',
  name: '',
  lastName: '',
  email: '',
  rank: 0,
  id: 0,
  img: '',
  names: [],
  follows: [],
  chats: []
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action: any) => {
      state.username = action.payload.username;
      state.name = action.payload.first_name;
      state.lastName = action.payload.last_name;
      state.email = action.payload.email;
      state.rank = action.payload.rank;
      state.id = action.payload.id;
      state.follows = action.payload.follows;
    },
    setUserImage: (state, action: any) => {
      state.img = action.payload;
    },
    setFriends: (state, action : PayloadAction<string[]>) => {
      state.names = action.payload;
    },
    setChats: (state, action : PayloadAction<object[]>) =>{
      state.chats = action.payload;
    }
  },
});

export const { setUserInfo, setUserImage, setFriends, setChats } = userSlice.actions;

export const selectUser = (state: any) => state.user;

export default userSlice.reducer;