import React, {useState} from "react";
import Helmet from "react-helmet";
import Navbar from "../Layout/Navbar";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Button, FormGroup} from "@mui/material";
import AdminActions from "../../actions/AdminActions";

export default function CreateUser() {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    if (errors.server) {
        console.log(errors.server);
    }

    const onChange = e => {
        if (e.target.id === "email") {
            setEmail(e.target.value)
        }
    };

    const onSubmit = e => {
        setLoading(true);
        e.preventDefault();
        AdminActions.CreateUser(email).then(r => {
            console.log(r);
            setLoading(false);
            document.location.href = '/users';
        }).catch(e => {
            console.log(e);
            setErrors(e.response.data);
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
                                error={!!errors.email}
                                helperText={errors.email}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Button
                                type="submit"
                                variant="contained">Register</Button>
                        </FormGroup>
                    </Box>
                </div>
            </div>
        </div>
    );
}
