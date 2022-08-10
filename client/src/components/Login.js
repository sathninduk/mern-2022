import React, {useState} from "react";
import Helmet from "react-helmet";
import Navbar from "./Layout/Navbar";
import Box from "@mui/material/Box";
import {Button, FormGroup} from "@mui/material";
import TextField from "@mui/material/TextField";
import AuthActions from "../actions/AuthActions";
import {Redirect} from "react-router-dom";
import jwt_decode from "jwt-decode";

import userData from "../utils/userData";

const user = userData();

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const onChange = e => {
        if (e.target.id === "email") {
            setEmail(e.target.value)
        }
        if (e.target.id === "password") {
            setPassword(e.target.value)
        }
    };

    const onSubmit = e => {
        setLoading(true);
        e.preventDefault();
        AuthActions.LoginUser(email, password).then(res => {
            localStorage.setItem("jwt", JSON.stringify(res.data));
            let jsonPayload = jwt_decode(res.data);
            if (jsonPayload.role === "user") {
                if (jsonPayload.status === true) {
                    document.location.href = '/notes';
                } else if (jsonPayload.status === false) {
                    document.location.href = '/reset';
                }
            } else if (jsonPayload.role === "admin") {
                document.location.href = '/user';
            }
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
                        <Redirect to="/notes"/> :
                        <Redirect to="/reset"/> :
                    <Redirect to="/users"/>
                : ""}

            <Navbar/>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <div className={"form-container con-mid"}>
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
                            <h5>Login</h5>
                        </FormGroup>
                        <FormGroup>
                            <TextField
                                onChange={onChange}
                                id="email"
                                label="Email"
                                variant="filled"
                            />
                            <TextField
                                onChange={onChange}
                                id="password"
                                label="Password"
                                variant="filled"
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
