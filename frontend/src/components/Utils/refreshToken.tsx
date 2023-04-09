import axios from "axios";
import { useNavigate } from 'react-router-dom';

const refreshToken = async ():Promise<number> => {
    try {
    const rt = sessionStorage.getItem('refresh_token');
    const response = await axios.post(`${process.env.BACK_URL}/transcendence/auth/refresh`,{},{
        headers: {
          Authorization: `Bearer ${rt}`,
        }});
        sessionStorage.setItem("access_token", response.data.access_token);
        sessionStorage.setItem("refresh_token", response.data.refresh_token);
        console.log(response);
        return response.status;
    } catch (error:any) {
        console.log(error);
        return error.response.status;
    }
}

export default refreshToken;