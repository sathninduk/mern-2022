import axios from 'axios';
import Keys from "../config/Keys";

// import authHeader from './auth-header';
function authHeader() {
    return null;
}

const API_URL = Keys.API_URL + "admin/";

class AdminActions {
    CreateUser(email) {
        return axios.post(API_URL + 'create-user', email, {});
    }
}

export default new AdminActions();
