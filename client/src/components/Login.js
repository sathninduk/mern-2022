import React, {Component} from "react";
import Helmet from "react-helmet";
import Navbar from "./Layout/Navbar";

export default function Login() {
    return (
        <div className={"con-mid"}>
            <Navbar/>
            <div>
                <Helmet>
                    <title>Login</title>
                </Helmet>
                <div className={"big-card"}>
                    <h5>Login</h5>
                    <p>Login fields</p>
                </div>
            </div>
        </div>
    );
}
