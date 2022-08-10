import React, {Component, useState} from "react";
import Helmet from "react-helmet";
import Navbar from "./Layout/Navbar";
import Box from "@mui/material/Box";
import {Button, FormGroup} from "@mui/material";
import TextField from "@mui/material/TextField";
import AuthActions from "../actions/AuthActions";

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
        AuthActions.LoginUser(email, password).then(() => {
            setLoading(false);
        }).catch(e => {
            console.log(e);
            setLoading(false);
        })
    };

    return (
        <div>
            <Navbar/>
            <Helmet>
                <title>Add new user</title>
            </Helmet>
            <div className={"form-container con-mid"}>
                <div className={"form-card con-mid"}>
                    {/*<form noValidate onSubmit={this.onSubmit}>*/}
                    <Box
                        component="form"
                        sx={{'& > :not(style)': {m: 1, width: '25ch'},}}
                        noValidate
                        autoComplete="off"
                        onSubmit={onSubmit}
                    >
                        <FormGroup>
                            <h5>Add new user</h5>
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
