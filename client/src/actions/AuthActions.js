import axios from 'axios';
import Keys from "../config/Keys";

// import authHeader from './auth-header';
function authHeader() {
    return null;
}

const API_URL = Keys.API_URL + "auth/";

class AdminActions {
    LoginUser(email, password) {
        return axios.post(API_URL + 'login', {email: email, password: password}, {}).then(res => {
            localStorage.setItem("jwt", JSON.stringify(res.data));
        });
    }
}

export default new AdminActions();
