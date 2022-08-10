import React, {Component} from "react";
import Helmet from "react-helmet";
import Navbar from "../Layout/Navbar";

export default function UpdateNotes() {
    return (
        <div className={"con-mid"}>
            <Navbar/>
            <div>
                <Helmet>
                    <title>Update Notes</title>
                </Helmet>
                <div className={"big-card"}>
                    <h5>Update Notes</h5>
                    <p></p>
                </div>
            </div>
        </div>
    );
}