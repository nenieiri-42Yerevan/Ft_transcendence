import axios from "axios";
import { useNavigate } from 'react-router-dom';

const refreshToken = async ():Promise<number> => {
    try {
    const rt = localStorage.getItem('refresh_token');
    const response = await axios.post(`${process.env.BACK_URL}/transcendence/auth/refresh`,{},{
        headers: {
          Authorization: `Bearer ${rt}`,
        }});
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
        return response.status;
    } catch (error:any) {
        console.log(error);
        return error.response.status;
    }
}

export default refreshToken;