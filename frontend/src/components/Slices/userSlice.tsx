import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { FORM_ERROR } from 'final-form'
import refreshToken from '../Utils/refreshToken'

// import { Dispatch } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { GetUser } from '../../../../backend/src/common/decorators/GetUser';
import { EditInfo } from '../Utils/Scheme';

export interface Friends {
  name: string,
  id: number
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
        console.log(action);
        
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

export const fetchFriendsData = async (flag:number, Navigate, dispatch: any, userInfo: UserInfo) => {
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
      console.log("ccc");
      console.log(response);
      friendNames.push({name: response.data.username, id: id});
    } catch (error) {
      if (error.response.status == 401)
      {
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

export const fetchMatches = async (flag:number, Navigate, dispatch: any, userInfo: UserInfo) => {
  try {
    const response = await axios.get(
      `${process.env.BACK_URL}/transcendence/user/${userInfo.id}/matches`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      },
    );
    //dispatch(setFriends(friendNames));
  } catch (error) {
    if (error.response.status == 401)
      {
        if ((await refreshToken()) != 200) {
          dispatch(setIsUnauth(true));
          Navigate("/transcendence/user/signin");
        } else {
          fetchMatches(flag, Navigate, dispatch, userInfo);
        }
      }
    console.log(error);
  }
};

export const getUserInfo = async (Navigate) => {
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
    return response.data;
  } catch (error) {
    console.log(error);
    if (error.response.status == 401)
    {
      if ((await refreshToken()) != 200) {
        dispatch(setIsUnauth(true));
        Navigate("/transcendence/user/signin");
      } else {
        getUserInfo(Navigate);
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

export const getUserById = async (id: any, Navigate) => {
  try {
    const response = await axios.get(`${process.env.BACK_URL}/transcendence/user/by-id/${id}`,
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
    if (error.response.statusCode == 401)
    {
      if ((await refreshToken()) != 200) {
        dispatch(setIsUnauth(true));
        Navigate("/transcendence/user/signin");
      } else {
        getUserById(id, Navigate);
      }
    }
    

  }
}

export const follow = async (dispatch: any, Navigate, userInfo: UserInfo, id: number)=>{
  try {
    const response = await axios.put(`${process.env.BACK_URL}/transcendence/user/follow/${userInfo.id}/${id}`,{},
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
    if (error.response.status == 401)
    {
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
      throw new Error(`HTTP error ${response.status}`);
    }
    const blob = await response.arrayBuffer()
    .then(buf => new Blob([buf], { type: 'image/png' }))
    const url = URL.createObjectURL(blob);
    console.log("zzz");
    
    console.log(url);
    if (flag == 0)
      dispatch(setUserImage(url));
    else if (flag == 1)
      return(url);
  } 
  catch (error) {
    if (error.response.status == 401)
    {
      if ((await refreshToken()) != 200) {
        dispatch(setIsUnauth(true));
        Navigate("/transcendence/user/signin");
      } else {
        getAvatar(flag, Navigate, dispatch, id);
      }
    }
    console.log("xxx");
    console.log(error);
    if (flag == 0)
      dispatch(setUserImage(null));
    else if (flag == 1)
      return (null);

  }
}

export const setAvatar = async ( imageFile: any, Navigate, id: any, dispatch: any) => {
  const formData = new FormData();
  console.log(imageFile);
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
    console.log(response);
    return (response.status);
  } 
  catch (error) {
    console.log(error);
    if (error.response.status == 401)
    {
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

export const block = async (dispatch, Navigate, userInfo: UserInfo, id: number)=>{
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
    if (error.response.status == 401)
    {
      if ((await refreshToken()) != 200) {
        dispatch(setIsUnauth(true));
        Navigate("/transcendence/user/signin");
      } else {
        block(dispatch, Navigate, userInfo, id);
      }
    }
  }
}

export const enable2fa = async (dispatch, Navigate, userInfo: UserInfo)=>{
  try {
    console.log("before");
    console.log(userInfo);
    const response = await axios.post(`${process.env.BACK_URL}/transcendence/auth/TFA_enable/`, {},
    {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
    }
    );
    console.log("after");
    console.log(await getUserInfo(Navigate));
    dispatch(setUserInfo(await getUserInfo(Navigate)));
    
    
    console.log(response);


  } 
  catch (error) {
    console.log(error);
    if (error.response.status == 401)
    {
      if ((await refreshToken()) != 200) {
        dispatch(setIsUnauth(true));
        Navigate("/transcendence/user/signin");
      } else {
        enable2fa(dispatch, Navigate, userInfo);
      }
    }
  }
}

export const disable2fa = async (dispatch, Navigate, userInfo: UserInfo)=>{
  try {
    console.log("before");
    console.log(userInfo);
    const response = await axios.post(`${process.env.BACK_URL}/transcendence/auth/TFA_disable/`, {},
    {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
    }
    );
    console.log("zzz");
    console.log(await getUserInfo(Navigate));
    dispatch(setUserInfo(await getUserInfo(Navigate)));
    
    console.log(response);


  } 
  catch (error) {
    console.log(error);
    if (error.response.status == 401)
    {
      if ((await refreshToken()) != 200) {
        dispatch(setIsUnauth(true));
        Navigate("/transcendence/user/signin");
      } else {
        disable2fa(dispatch, Navigate, userInfo);
      }
    }
  }
}


export const updatePass = async (dispatch, Navigate, data: EditInfo, id:number)=>{
  try {
    console.log("psw ", data);
    
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
    console.log("zzz");    
    console.log(response);


  } 
  catch (error) {
    console.log(error);
    if (error.response.status == 401)
    {
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

export const updateUser = async (dispatch, Navigate, sendData, id:number)=>{
  try {
    const response = await axios.put(`${process.env.BACK_URL}/transcendence/user/update-user/${id}`, 
    sendData,
    {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
    }
    ); 
    console.log(response);
  } 
  catch (error) {
    console.log(error);
    if (error.response.status == 401)
    {
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

function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}
