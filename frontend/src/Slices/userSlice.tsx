import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from "axios";
import { useSelector } from 'react-redux';

interface UserInfo {
  username: string;
  name: string;
  lastName: string;
  email: string;
  rank: number;
  id: number,
  img: string,
  friends: string[],
  follows: number[];
}

export const initialState: UserInfo = {
  username: '',
  name: '',
  lastName: '',
  email: '',
  rank: 0,
  id: 0,
  img: '',
  friends: [],
  follows: [],
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
    setFriends: (state, action : any) => {
      state.friends.push("hello");
    }
  },
});

export const { setUserInfo, setUserImage, setFriends } = userSlice.actions;

export const selectUser = (state: any) => state.user;

export const fetchUserImage = async (dispatch: any, info: any) =>  {
  try {
    const response = await axios.get(`http://localhost:7000/transcendence/user?id = ${info.id}/avatar`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
      }
    });
    dispatch(setUserImage(response.data));
    console.log(response.data);
  } catch (error) {
    console.error(error);
  };
};
export const fetchFriends = async (dispatch:any, id: number) => {
    try {
        const response = await axios.get(`http://localhost:7000/transcendence/user/${id}/user`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
          }
      });
      console.log("zzzz");
      console.log(response.data);
      dispatch(setFriends(response.data.username));
    }
    catch (error) {
        console.log(error);
    }
}

export default userSlice.reducer;