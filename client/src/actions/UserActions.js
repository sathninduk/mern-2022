import axios from 'axios';
import Keys from "../config/Keys";

import authHeader from '../config/AuthHeader';

const API_URL = Keys.API_URL + "user/";

class UserActions {
    UpdateUserInfo(firstName, lastName, dateOfBirth, mobile, password, password2) {
        return axios.put(API_URL + 'user', {
            firstName: firstName,
            lastName: lastName,
            dateOfBirth: dateOfBirth,
            mobile: mobile,
            password: password,
            password2: password2
        }, {headers: authHeader()});
    }

    CreateNote(title, note) {
        return axios.post(API_URL + 'note', {
            title: title,
            note: note
        }, {headers: authHeader()})
    }

    FetchNotes(page) {
        return axios.get(API_URL + 'notes/' + page, {headers: authHeader()})
    }

    FetchNotesCount() {
        return axios.get(API_URL + 'notes-count', {headers: authHeader()})
    }

    DeleteNote(id) {
        return axios.delete(API_URL + 'note/' + id, {headers: authHeader()})
    }

    GetNoteById(id) {
        return axios.get(API_URL + 'note/' + id, {headers: authHeader()})
    }

    UpdateNote(id, title, note) {
        return axios.put(API_URL + 'note/' + id, {
            title: title,
            note: note
        }, {headers: authHeader()})
    }

}

export default new UserActions();
