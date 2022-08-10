import React, {Component} from "react";
import Helmet from "react-helmet";
import Navbar from "./Navbar";

export default function NotFound() {
    return (
        <div className={"con-mid"}>
            <Navbar/>
            <div>
                <Helmet>
                    <title>Not Found</title>
                </Helmet>
                <div className={"big-card"}>
                    <h5>Not Found</h5>
                    <p></p>
                </div>
            </div>
        </div>
    );
}