import React from "react";
import {Link, Redirect} from "react-router-dom";
import userData from "../../utils/userData";

const user = userData();

export default function Navbar() {

    const logout = () => {
        localStorage.removeItem("jwt");
        document.location.href = '/';
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark navbar-bg">
            <div className={"container"}>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16"
                         fill="none"
                         className="css-1170n61">
                        <rect x="1" y="5" width="14" height="1.5" rx="1" fill="rgba(255, 255, 255, .9)"></rect>
                        <rect x="1" y="9" width="14" height="1.5" rx="1" fill="rgba(255, 255, 255, .9)"></rect>
                    </svg>
                </button>
                {user.role ?
                    user.role === 'user' ?
                    <a href={"/notes/1"} className="navbar-brand">
                        Surge Assignment
                    </a> :
                    <a href={"/users"} className="navbar-brand">
                        Surge Assignment
                    </a> :
                    <a href={"/"} className="navbar-brand">
                        Surge Assignment
                    </a>
                }

                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item con-mid">
                            <Link to={"/"} className="nav-link">
                                Link 1
                            </Link>
                        </li>
                        <li className="nav-item con-mid">
                            <Link to={"/"} className="nav-link">
                                Link 2
                            </Link>
                        </li>
                    </ul>

                    <div className="navbar-nav ml-auto">
                        {user ?
                            <li className="nav-item nav-testnet">
                                <span onClick={logout} className="nav-link logout-link">
                                    Logout
                                </span>
                            </li> :
                            <li className="nav-item nav-testnet">
                                <Link to={"/"} className="nav-link">
                                    Login
                                </Link>
                            </li>
                        }
                    </div>

                </div>
            </div>
        </nav>
    );
}