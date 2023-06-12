import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { FORM_ERROR } from 'final-form'
import refreshToken from '../Utils/refreshToken'
import defaultAvatar from '../../assets/images/avatar.png'
import { Dispatch } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { GetUser } from '../../../../backend/src/common/decorators/GetUser';
import { EditInfo } from '../Utils/Scheme';

export interface Friends {
  name: string,
  id: number,
  status: number
}

export interface Matches {
  date: string,
  id: number,
  loser: UserInfo,
  winner: UserInfo,
  score: number[]
}

interface UserInfo {
  username: string;
  isUnAuth: boolean;
  names?: Friends[];
  lastName: string;
  email: string;
  rank: number;
  name: string;
  id: number;
  img?: string | undefined;
  follows: number[];
  blocked: number[];
  TFA_enabled: boolean;
  TFA_secret: string;
  user_42: boolean;
}


interface User {
  user: UserInfo | null;
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
        TFA_enabled: action.payload.TFA_enabled,
        lastName: action.payload.last_name,
        email: action.payload.email,
        rank: action.payload.rank,
        id: action.payload.id,
        follows: action.payload.follows,
        blocked: action.payload.blocked,
        TFA_secret: action.payload.TFA_secret,
        user_42: action.payload.user_42,
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
    setUserImage: (state, action: PayloadAction<any>) => {
      if (state.user)
        state.user.img = action.payload;
    },
    setFriends: (state, action: PayloadAction<Friends[]>) => {
      if (state.user)
        state.user.names = action.payload;
    },
    setFollows: (state, action: PayloadAction<number[]>) => {
      if (state.user)
        state.user.follows = action.payload;
    },
    setBlocked: (state, action: PayloadAction<number[]>) => {
      if (state.user)
        state.user.blocked = action.payload;
    },
    setIsUnauth: (state, action: PayloadAction<boolean>) => {
      if (state.user)
        state.user.isUnAuth = action.payload;
    },
  },
});

export const {
  setUserInfo,
  setUserImage,
  setFollows,
  setBlocked,
  setFriends,
  logout,
  loginFailure,
  loginRequest,
  setIsUnauth,
} = userSlice.actions;

export const selectUser = (state: any) => state.user;

export default userSlice.reducer;

export const fetchFriendsData = async (flag: number, Navigate, dispatch: any, userInfo: UserInfo) => {
  const friendIds = userInfo.follows;
  const friendNames: Friends[] = [];
  for (const id of friendIds) {
    try {
      const response = await axios.get(
        `${process.env.BACK_URL}/transcendence/user/by-id/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        },
      );
      friendNames.push({ name: response.data.username,status:response.data.status, id: id });
    } catch (error) {
      if (error.response.status == 401) {
        if ((await refreshToken()) != 200) {
          dispatch(setIsUnauth(true));
          Navigate("/transcendence/user/signin");
        } else {
          fetchFriendsData(flag, Navigate, dispatch, userInfo);
        }
      }
      console.log(error);
    }
  }
  if (flag == 0)
    dispatch(setFriends(friendNames));
  else
    return (friendNames);
};

export const fetchMatches = async (flag: number, Navigate, dispatch: any, userInfo: UserInfo) => {
  const userMatches: Matches[] = [];
  try {
    const response = await axios.get(
      `${process.env.BACK_URL}/transcendence/user/${userInfo.id}/matches`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      },
    );
    if (response.status == 200) {
      userMatches.push(...response.data);
    } else {
      console.log("ERROR cant fetch matches");
    }
  } catch (error) {
    if (error.response.status == 401) {
      if ((await refreshToken()) != 200) {
        dispatch(setIsUnauth(true));
        Navigate("/transcendence/user/signin");
      } else {
        fetchMatches(flag, Navigate, dispatch, userInfo);
      }
    }
    console.log(error);
  }
    return userMatches;
};

export const getUserInfo = async (Navigate, dispatch) => {
  try {
    const response = await axios.get(
      `${process.env.BACK_URL}/transcendence/user/by-token/${localStorage.getItem(
        'refresh_token',
      )}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      },
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    if (error.response.status == 401) {
      if ((await refreshToken()) != 200) {
        dispatch(setIsUnauth(true));
        Navigate("/transcendence/user/signin");
      } else {
        getUserInfo(Navigate, dispatch);
      }
    }
  }
}

// export const getUserByName = async (data: any) => {
//   try {
//     const response = await axios.get(`${process.env.BACK_URL}/transcendence/user/by-name/${data.name}`
//       //   headers: {
//       //     Authorization: `Bearer ${localStorage.getItem('access_token')}`
//       //   }

//     );
//     console.log(response);
//   } catch (error) {
//     return { [FORM_ERROR]: error.response.data.message }

//   }
// }


export const filterItems = ((query, users) => {
  return (users.filter((elem) => elem.username.includes(query)));
})

export const getUsers = async (Navigate, dispatch) => {
  try {
    const response = await axios.get(`${process.env.BACK_URL}/transcendence/user/`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
    );
    return (response.data);
  }
  catch (error) {
    console.log(error);
    if (error.response.status == 401) {
      if ((await refreshToken()) != 200) {
        dispatch(setIsUnauth(true));
        Navigate("/transcendence/user/signin");
      } else {
        getUsers(Navigate, dispatch);
      }
    }
    throw (error);

  }
}

export const getUserById = async (id: any, Navigate, dispatch) => {
  try {
    const response = await axios.get(`${process.env.BACK_URL}/transcendence/user/by-id/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
    );
    console.log(response);
    return (response.data);
  }
  catch (error) {
    console.log(error);
    if (error.response.status == 401) {
      if ((await refreshToken()) != 200) {
        dispatch(setIsUnauth(true));
        Navigate("/transcendence/user/signin");
      } else {
        getUserById(id, Navigate, dispatch);
      }
    }
    throw (error);

  }
}

export const follow = async (dispatch: any, Navigate, userInfo: UserInfo, id: number) => {
  try {
    const response = await axios.put(`${process.env.BACK_URL}/transcendence/user/follow/${userInfo.id}/${id}`, {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
    );
    dispatch(setFollows(response.data));
  }
  catch (error) {
    console.log(error);
    if (error.response.status == 401) {
      if ((await refreshToken()) != 200) {
        dispatch(setIsUnauth(true));
        Navigate("/transcendence/user/signin");
      } else {
        follow(dispatch, Navigate, userInfo, id);
      }
    }


  }
}

export const getAvatar = async (flag: number, Navigate, dispatch: any, id: string | undefined) => {
  try {
    const response = await fetch(`${process.env.BACK_URL}/transcendence/user/${id}/avatar`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
    );
    if (!response.ok) {
      throw response.status;
    }
    const buf = await response.arrayBuffer()
    const blob = new Blob([buf], { type: 'image/png' });
    if (blob.size !== 0) {
      const url = URL.createObjectURL(blob);
      if (flag == 0)
        dispatch(setUserImage(url));
      else if (flag == 1)
        return (url);
    }
    else {
      if (flag == 0)
        dispatch(setUserImage(defaultAvatar));
      else if (flag == 1)
        return (defaultAvatar);
    }
  }
  catch (error) {
    if (error == 401) {
      if ((await refreshToken()) != 200) {
        dispatch(setIsUnauth(true));
        Navigate("/transcendence/user/signin");
      } else {
        getAvatar(flag, Navigate, dispatch, id);
      }
    }

  }
}

export const setAvatar = async (imageFile: any, Navigate, id: any, dispatch: any) => {
  const formData = new FormData();
  formData.append("file", imageFile);
  try {
    const response = await axios.put(`${process.env.BACK_URL}/transcendence/user/update-avatar/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return (response.status);
  }
  catch (error) {
    console.log(error);
    if (error.response.status == 401) {
      if ((await refreshToken()) != 200) {
        dispatch(setIsUnauth(true));
        Navigate("/transcendence/user/signin");
      } else {
        setAvatar(imageFile, Navigate, id, dispatch);
      }
    }
    return (error.response.status);

  }
}

export const block = async (dispatch, Navigate, userInfo: UserInfo, id: number) => {
  try {
    const response = await axios.put(`${process.env.BACK_URL}/transcendence/user/block/${userInfo.id}/${id}`, {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
    );
    dispatch(setBlocked(response.data));
  }
  catch (error) {
    console.log(error);
    if (error.response.status == 401) {
      if ((await refreshToken()) != 200) {
        dispatch(setIsUnauth(true));
        Navigate("/transcendence/user/signin");
      } else {
        block(dispatch, Navigate, userInfo, id);
      }
    }
  }
}

export const enable2fa = async (dispatch, Navigate, userInfo: UserInfo) => {
  try {
    const response = await axios.post(`${process.env.BACK_URL}/transcendence/auth/TFA_enable/`, {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
    );
    console.log(await getUserInfo(Navigate, dispatch));
    dispatch(setUserInfo(await getUserInfo(Navigate, dispatch)));
  }
  catch (error) {
    console.log(error);
    if (error.response.status == 401) {
      if ((await refreshToken()) != 200) {
        dispatch(setIsUnauth(true));
        Navigate("/transcendence/user/signin");
      } else {
        enable2fa(dispatch, Navigate, userInfo);
      }
    }
  }
}

export const disable2fa = async (dispatch, Navigate, userInfo: UserInfo) => {
  try {
    const response = await axios.post(`${process.env.BACK_URL}/transcendence/auth/TFA_disable/`, {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
    );
    console.log(await getUserInfo(Navigate, dispatch));
    dispatch(setUserInfo(await getUserInfo(Navigate, dispatch)));
  }
  catch (error) {
    console.log(error);
    if (error.response.status == 401) {
      if ((await refreshToken()) != 200) {
        dispatch(setIsUnauth(true));
        Navigate("/transcendence/user/signin");
      } else {
        disable2fa(dispatch, Navigate, userInfo);
      }
    }
  }
}


export const updatePass = async (dispatch, Navigate, data: EditInfo, id: number) => {
  try {

    const response = await axios.put(`${process.env.BACK_URL}/transcendence/user/update-password/${id}`,
      {
        old: data.cur_password,
        current: data.new_password,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
    );


  }
  catch (error) {
    console.log(error);
    if (error.response.status == 401) {
      if ((await refreshToken()) != 200) {
        dispatch(setIsUnauth(true));
        Navigate("/transcendence/user/signin");
      } else {
        updatePass(dispatch, Navigate, data, id);
      }
    }
    throw error;
  }
}

export const updateUser = async (dispatch, Navigate, sendData, id: number) => {
  try {
    const response = await axios.put(`${process.env.BACK_URL}/transcendence/user/update-user/${id}`,
      sendData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
    );
  }
  catch (error) {
    console.log(error);
    if (error.response.status == 401) {
      if ((await refreshToken()) != 200) {
        dispatch(setIsUnauth(true));
        Navigate("/transcendence/user/signin");
      } else {
        updateUser(dispatch, Navigate, sendData, id);
      }
    }
    else
      throw error;
  }
}
