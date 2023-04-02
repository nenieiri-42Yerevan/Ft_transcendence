import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { FORM_ERROR } from 'final-form'

// import { Dispatch } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { GetUser } from '../../../../backend/src/common/decorators/GetUser';

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

interface User {
  user: UserInfo | null
  isLoading: boolean;
  error: string | null;
}

export const initialState: User = {
  user: null,
  isLoading: false,
  error: null
};



export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action: any) => {
      const user: UserInfo = {
        ...state.user,
        username: action.payload.username,
        name: action.payload.first_name,
        lastName: action.payload.last_name,
        email: action.payload.email,
        rank: action.payload.rank,
        id: action.payload.id,
        follows: action.payload.follows
      }
      state.user = user;
      state.isLoading = false;
      state.error = null;
    },
    loginRequest: (state) => {
      state.isLoading = true;
      state.error = null;
      // console.log(state);

    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isLoading = false;
      state.error = null;
    },
    setUserImage: (state, action: any) => {
      state.user.img = action.payload;
    },
    setFriends: (state, action: PayloadAction<string[]>) => {
      state.user.names = action.payload;
    },
  },
});

export const {
  setUserInfo,
  setUserImage,
  setFriends,
  logout,
  loginFailure,
  loginRequest
} = userSlice.actions;

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

}

export const getUserByName = async (data: any) => {
  try {
    const response = await axios.get(`${process.env.BACK_URL}/transcendence/user/by-name/${data.name}`
      //   headers: {
      //     Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
      //   }

    );
    console.log(response);
  } catch (error) {
    return { [FORM_ERROR]: error.response.data.message }

  }
}

