import React, {useState} from "react";
import Helmet from "react-helmet";
import Navbar from "../Layout/Navbar";
import {Link, Redirect} from "react-router-dom";

import userData from "../../utils/userData";
import UserActions from "../../actions/UserActions";
import {Button} from "@mui/material";

const user = userData();

export default function Notes() {

    const [notes, setNotes] = useState([]);

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    UserActions.FetchNotes(1).then(res => {
        setLoading(false);
        setNotes(res.data);
    }).catch(e => {
        console.log(e);
        setLoading(false);
    })

    const deleteNote = id => {
        UserActions.DeleteNote(id).then(res => {
            console.log(res)
            document.getElementById(id).style.display = 'none';
            setLoading(true);
        }).catch(e => {
            console.log(e);
            setLoading(false);
        })
    }

    return (
        <div>
            {user.role === "user" || user.role === "admin" ?
                user.role === "user" ?
                    user.status === true ?
                        "" :
                        <Redirect to="/reset"/> :
                    <Redirect to="/users"/>
                : <Redirect to="/"/>}

            <Navbar/>
            <Helmet>
                <title>Notes</title>
            </Helmet>
            <div className={"form-container con-mid"} style={{marginTop: "56px"}}>
                <h3>Notes</h3>
                <Link to={'/create-note'}>
                    + Add note
                </Link>
                <br/>
                {notes.map(note =>
                    <div id={note._id} key={note._id} className={"note-card"}>
                        <h5>{note.title}</h5>
                        <p>{note.note}</p>
                        <a href={'/note/update/' + note._id}>Update</a>
                        <Button onClick={() => deleteNote(note._id)}>
                            Delete
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}