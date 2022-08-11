import axios from 'axios';
import Keys from "../config/Keys";

import authHeader from '../config/AuthHeader';

const API_URL = Keys.API_URL + "admin/";

class AdminActions {
    CreateUser(email) {
        return axios.post(API_URL + 'create-user', {email: email}, {headers: authHeader()});
    }

    FetchUsers() {
        return axios.get(API_URL + 'users', {headers: authHeader()});
    }
}

export default new AdminActions();
