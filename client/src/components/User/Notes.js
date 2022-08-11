import React from "react";
import Helmet from "react-helmet";
import Navbar from "../Layout/Navbar";
import {Link, Redirect} from "react-router-dom";

import userData from "../../utils/userData";
const user = userData();

export default function Notes() {
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
            </div>
        </div>
    );
}