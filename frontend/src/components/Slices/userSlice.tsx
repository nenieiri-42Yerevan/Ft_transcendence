import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
// import { Dispatch } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

interface UserInfo {
  username: string;
  name: string;
  lastName: string;
  email: string;
  rank: number;
  names: string[];
  id: number;
  img: string;
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
  names: [],
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
    setFriends: (state, action: PayloadAction<string[]>) => {
      state.names = action.payload;
    },
  },
});

export const { setUserInfo, setUserImage, setFriends } = userSlice.actions;

export const selectUser = (state: any) => state.user;

export default userSlice.reducer;

export const fetchFriendsData = async (dispatch: any, userInfo: UserInfo) => {
  const friendIds = userInfo.follows;
  const friendNames: string[] = [];
  for (const id of friendIds) {
    try {
      const response = await axios.get(
        `${process.env.BACK_URL}/transcendence/user/by-id/${id}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
          },
        },
      );
      friendNames.push(response.data.username);
    } catch (error) {
      console.log(error);
    }
  }
  dispatch(setFriends(friendNames));
};

export const fetchMatches = async (dispatch: any, userInfo: UserInfo) => {
  try {
    const response = await axios.get(
      `${process.env.BACK_URL}/transcendence/user/${userInfo.id}/matches`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
        },
      },
    );
    //dispatch(setFriends(friendNames));
  } catch (error) {
    console.log(error);
  }
};

export const getUserInfo = async () => {
  try {
    const response = await axios.get(
      `${process.env.BACK_URL}/transcendence/user/by-token/${sessionStorage.getItem(
        'refresh_token',
      )}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const logOut = async () => {
  try {
    const response = await axios.post(`${process.env.BACK_URL}/transcendence/auth/logout`,{}, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
      }
    });
  } catch (error) {
    console.log(error);
  }
}
