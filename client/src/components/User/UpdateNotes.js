import React, {Component, useEffect, useState} from "react";
import Helmet from "react-helmet";
import Navbar from "../Layout/Navbar";
import {Redirect} from "react-router-dom";
import Box from "@mui/material/Box";
import {Button, FormGroup} from "@mui/material";
import TextField from "@mui/material/TextField";

import userData from "../../utils/userData";
import UserActions from "../../actions/UserActions";

const user = userData();

const pathname = window.location.pathname;
const id = pathname.split('/').pop();

export default function UpdateNotes() {

    const [title, setTitle] = useState("");
    const [note, setNote] = useState("");

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});


    function fetchNoteData() {
        UserActions.GetNoteById(id).then((res) => {
            setTitle(res.data.title);
            setNote(res.data.note);
        }).catch(err => {
            console.log(err);
        })
    }

    const onChange = e => {
        if (e.target.id === "title") {
            setTitle(e.target.value)
        }
        if (e.target.id === "note") {
            setNote(e.target.value)
        }
    };

    const onSubmit = e => {
        setLoading(true);
        e.preventDefault();
        UserActions.UpdateNote(id, title, note).then(res => {
            setLoading(false);
            document.location.href = '/notes';
        }).catch(e => {
            console.log(e);
            setLoading(false);
        })
    };

    useEffect(() => {
        fetchNoteData()
    }, [])

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
                <title>Update note</title>
            </Helmet>
            <div className={"form-container con-mid"} style={{marginTop: "56px"}}>
                <div className={"form-card con-mid"}>
                    {/*<form noValidate onSubmit={this.onSubmit}>*/}
                    <Box
                        component="form"
                        sx={{'& > :not(style)': {m: 1, width: '25ch'},}}
                        noValidate
                        autoComplete="on"
                        onSubmit={onSubmit}
                    >
                        <FormGroup>
                            <h5>User Details</h5>
                        </FormGroup>
                        <FormGroup>
                            <TextField
                                onChange={onChange}
                                id="title"
                                label="Title"
                                variant="filled"
                                style={{margin: "10px 0"}}
                                value={title}
                            />
                            <TextField
                                onChange={onChange}
                                id="note"
                                label="Note"
                                variant="filled"
                                multiline
                                rows={4}
                                style={{margin: "10px 0"}}
                                value={note}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Button
                                type="submit"
                                variant="contained">Update</Button>
                        </FormGroup>
                    </Box>
                </div>
            </div>
        </div>
    );
}