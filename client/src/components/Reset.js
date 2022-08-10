import React, {Component} from "react";
import Helmet from "react-helmet";
import Navbar from "./Layout/Navbar";

export default function Reset() {
    return (
        <div className={"con-mid"}>
            <Navbar/>
            <div>
                <Helmet>
                    <title>Reset</title>
                </Helmet>
                <div className={"big-card"}>
                    <h5>Reset</h5>
                </div>
            </div>
        </div>
    );
}