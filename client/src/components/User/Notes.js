import React, {Component} from "react";
import Helmet from "react-helmet";
import Navbar from "../Layout/Navbar";

export default function Notes() {
    return (
        <div className={"con-mid"}>
            <Navbar/>
            <div>
                <Helmet>
                    <title>Notes</title>
                </Helmet>
                <div className={"big-card"}>
                    <h5>Notes</h5>
                    <p></p>
                </div>
            </div>
        </div>
    );
}