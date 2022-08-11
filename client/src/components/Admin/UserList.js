import React from "react";
import Helmet from "react-helmet";
import Navbar from "../Layout/Navbar";
import {Redirect} from "react-router-dom";

import userData from "../../utils/userData";

const user = userData();

export default function UserList() {
    return (
        <div>
            {user.role === "user" || user.role === "admin" ?
                user.role === "user" ?
                    user.status === true ?
                        <Redirect to="/notes"/> :
                        <Redirect to="/reset"/> :
                    ""
                : <Redirect to="/"/>}

            <Navbar/>
            <Helmet>
                <title>Users</title>
            </Helmet>
            <div className={"form-container con-mid"} style={{marginTop: "56px"}}>
                <h3>Users</h3>
            </div>
        </div>
    );
}