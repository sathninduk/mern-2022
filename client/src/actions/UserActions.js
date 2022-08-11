import axios from 'axios';
import Keys from "../config/Keys";

import authHeader from '../config/AuthHeader';

const API_URL = Keys.API_URL + "user/";

class UserActions {
    UpdateUserInfo(firstName, lastName, dateOfBirth, mobile, password, password2) {
        return axios.post(API_URL + 'update-user', {
            firstName: firstName,
            lastName: lastName,
            dateOfBirth: dateOfBirth,
            mobile: mobile,
            password: password,
            password2: password2
        }, {headers: authHeader()});
    }

    CreateNote(title, note) {
        return axios.post(API_URL + 'create-note', {
            title: title,
            note: note
        }, {headers: authHeader()})
    }


}

export default new UserActions();
