import axios from "axios";
import { useNavigate } from 'react-router-dom';

const refreshToken = async ():Promise<number> => {
    try {
    const rt = sessionStorage.getItem('refresh_token');
    const response = await axios.post('http://localhost:7000/transcendence/auth/refresh',{},{
        headers: {
          Authorization: `Bearer ${rt}`,
        }});
        sessionStorage.setItem("access_token", response.data.accessToken);
        sessionStorage.setItem("refresh_token", response.data.refreshToken);
        return response.data.status;
    } catch (error:any) {
        console.log(error);
        return error.response.status;
    }
}

export default refreshToken;