import React, {Component} from "react";
import Helmet from "react-helmet";
import Navbar from "../Layout/Navbar";

export default function UserList() {
    return (
        <div className={"con-mid"}>
            <Navbar/>
            <div>
                <Helmet>
                    <title>User List</title>
                </Helmet>
                <div className={"big-card"}>
                    <h5>User List</h5>
                    <p></p>
                </div>
            </div>
        </div>
    );
}