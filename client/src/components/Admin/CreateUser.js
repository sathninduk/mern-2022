import React, {useState} from "react";
import Helmet from "react-helmet";
import Navbar from "../Layout/Navbar";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Button} from "@mui/material";

export default function CreateUser() {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    return (
        <div className={"con-mid"}>
            <Navbar/>
            <div>
                <Helmet>
                    <title>Add new user</title>
                </Helmet>
                <div className={"big-card"}>
                    <h5>Add new user</h5>
                    <Box
                        component="form"
                        sx={{'& > :not(style)': {m: 1, width: '25ch'},}}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField id="email" label="Filled" variant="filled"/>

                        <Button variant="contained">Register</Button>
                    </Box>
                </div>
            </div>
        </div>
    );
}
