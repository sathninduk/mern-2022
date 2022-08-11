import axios from 'axios';
import Keys from "../config/Keys";

const API_URL = Keys.API_URL + "auth/";

class AdminActions {
    LoginUser(email, password) {
        return axios.post(API_URL + 'login', {email: email, password: password}, {});
    }
}

export default new AdminActions();
