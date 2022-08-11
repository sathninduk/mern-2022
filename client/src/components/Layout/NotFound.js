import React from "react";
import Helmet from "react-helmet";
import Navbar from "./Navbar";

export default function NotFound() {
    return (
        <div>
            <Navbar/>
            <Helmet>
                <title>Not Found</title>
            </Helmet>
            <div className={"form-container con-mid"} style={{marginTop: "56px"}}>
                <h3>404 - Not Found</h3>
            </div>
        </div>
    );
}