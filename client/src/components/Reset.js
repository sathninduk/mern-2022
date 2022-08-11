import React, {Component, useState} from "react";
import Helmet from "react-helmet";
import Navbar from "./Layout/Navbar";
import {Redirect} from "react-router-dom";
import Box from "@mui/material/Box";
import {Button, FormGroup} from "@mui/material";
import TextField from "@mui/material/TextField";

import userData from "../utils/userData";
import UserActions from "../actions/UserActions";
import jwt_decode from "jwt-decode";
const user = userData();

export default function Reset() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const onChange = e => {
        if (e.target.id === "firstName") {
            setFirstName(e.target.value)
        }
        if (e.target.id === "lastName") {
            setLastName(e.target.value)
        }
        if (e.target.id === "dateOfBirth") {
            setDateOfBirth(e.target.value)
        }
        if (e.target.id === "mobile") {
            setMobile(e.target.value)
        }
        if (e.target.id === "password") {
            setPassword(e.target.value)
        }
        if (e.target.id === "password2") {
            setPassword2(e.target.value)
        }
    };

    const onSubmit = e => {
        setLoading(true);
        e.preventDefault();
        UserActions.UpdateUserInfo(firstName, lastName, dateOfBirth, mobile, password, password2).then(res => {
            setLoading(false);
            localStorage.removeItem("jwt");
            document.location.href = '/';
        }).catch(e => {
            console.log(e);
            setLoading(false);
        })
    };

    return (
        <div>
            {user.role === "user" || user.role === "admin" ?
                user.role === "user" ?
                    user.status === true ?
                        <Redirect to="/notes/1"/> :
                        "" :
                    <Redirect to="/users"/>
                : <Redirect to="/"/>}

            <Navbar/>
            <Helmet>
                <title>User Details</title>
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
                                id="firstName"
                                label="First name"
                                variant="filled"
                                style={{margin: "10px 0"}}
                            />
                            <TextField
                                onChange={onChange}
                                id="lastName"
                                label="Last name"
                                variant="filled"
                                style={{margin: "10px 0"}}
                            />
                            <TextField
                                onChange={onChange}
                                id="dateOfBirth"
                                label="Date of birth"
                                style={{padding: "10px 0"}}
                                variant="filled"
                                type="date"
                            />
                            <TextField
                                onChange={onChange}
                                id="mobile"
                                label="Mobile number"
                                variant="filled"
                                style={{margin: "10px 0"}}
                            />
                            <TextField
                                onChange={onChange}
                                id="password"
                                label="New password"
                                variant="filled"
                                style={{margin: "10px 0"}}
                            />
                            <TextField
                                onChange={onChange}
                                id="password2"
                                label="Confirm new password"
                                variant="filled"
                                style={{margin: "10px 0"}}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Button
                                type="submit"
                                variant="contained">Login</Button>
                        </FormGroup>
                    </Box>
                </div>
            </div>
        </div>
    );
}