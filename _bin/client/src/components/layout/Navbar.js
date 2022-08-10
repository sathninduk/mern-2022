import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authActions";
import axios from "axios";
import {Redirect} from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

//axios.defaults.baseURL = process.env.APP_URL
const baseURL = require("../../config/keys").API_URL;

let pathname = window.location.pathname;
let split_path = pathname.split('/');
let path_length = split_path.length;

// id
let id = pathname.split('/').pop();

// id2
let id2 = pathname.split('/')[path_length - 2];

class Navbar extends Component {

    state = {
        verification: true,
        verification_2: false,
        logoutLoading: false
    }

    onLogoutClick = async e => {
        this.setState({logoutLoading: true});
        await axios.post(baseURL + `/api/u/token-logout`, {}, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': 'x-access-token',
                'x-access-token': localStorage.getItem("jwtToken")
            }
        }).then((res) => {
            console.log("Logout");
            this.setState({logoutLoading: false});
        }).catch((err) => {
            console.log(err);
            this.setState({logoutLoading: false});
        });

        e.preventDefault();
        this.props.logoutUser();

    };

    componentDidMount = () => {
        if (id === ''
            || id === 'about'
            || id === 'contact'
            || id === 'partners'
            || id === 'gallery'
            || id === 'login'
            || id === 'register'
            || id === 'all-courses'
            || id === 'forgot'
            || id === 'verification'
            || id === 'forgot-change-password'
            || id2 === 'verify-email') {

            if (id === 'verification') {


                axios.get(baseURL + `/api/admin/security/check-point`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Headers': 'x-access-token',
                        'x-access-token': localStorage.getItem("jwtToken")
                    }
                }).then((res) => {
                    if (res.data.email) {
                        let verification = res.data.verification;
                        if (verification === 0) {
                            console.log("Unverified");
                            this.setState({verification_2: false});
                        } else {
                            console.log("Verified");
                            this.setState({verification_2: true});
                        }
                    } else {
                        console.log(res.data);
                        //this.props.logoutUser();
                    }
                }).catch((err) => {
                    if (err.status !== "404") {
                        this.props.logoutUser();
                    }
                });

            } else {

            }

        } else {

            axios.get(baseURL + `/api/admin/security/check-point`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Headers': 'x-access-token',
                    'x-access-token': localStorage.getItem("jwtToken")
                }
            }).then((res) => {
                //console.log(res.data.email);
                //if (res.data.length === 1) {
                console.log(res.data.email);
                if (res.data.email) {
                    let verification = res.data.verification;
                    if (verification === 0) {
                        console.log("Unverified");
                        this.setState({verification: false});
                    } else {
                        console.log("Verified");
                        this.setState({verification: true});
                    }
                } else {
                    this.props.logoutUser();
                }
            }).catch((err) => {
                if (err.status !== "404") {
                    this.props.logoutUser();
                }
            });

        }

    }

    render() {

        const {user} = this.props.auth;

        return (
            <div className={"nav-master-div"} style={{position: 'absolute'}}>
                {/*
                {id === '' || id === 'about' || id === 'contact' || id === 'gallery'
                || id === 'partners'
                    ?
                    */}

                {
                    this.state.verification === false ?
                        <Redirect to="/verification"/> :
                        id === 'verification' && this.state.verification_2 === true ?
                            <Redirect to="/all-courses"/> : ""
                }

                <nav
                    className="navbar navbar-expand-lg top-space navbar-light bg-white header-light fixed-top navbar-boxed header-reverse-scroll new-navbar"
                    style={{boxShadow: "0px 1px 12px #00000012"}}>
                    <div className="container-fluid nav-header-container">
                        <div className="col-6 col-lg-2 me-auto ps-lg-0">
                            <a className="navbar-brand" href="/">
                                <img src="/docs/images/nav-logo-word.png" data-at2x="docs/images/nav-logo-word.png"
                                     className="default-logo" style={{width: "160px"}} alt=""/>
                            </a>
                        </div>
                        <div className="col-auto menu-order px-lg-0">
                            <button className="navbar-toggler float-end" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#navbarNav" aria-controls="navbarNav"
                                    aria-label="Toggle navigation">
                                <span className="navbar-toggler-line"/>
                                <span className="navbar-toggler-line"/>
                                <span className="navbar-toggler-line"/>
                                <span className="navbar-toggler-line"/>
                            </button>
                            <div className=" collapse navbar-collapse justify-content-center" id="navbarNav">
                                <ul className="navbar-nav alt-font">
                                    <li className="nav-item dropdown megamenu">
                                        <a href="/" className="nav-link">Home</a>
                                    </li>

                                    {user.role === 1 ?
                                        <li className="nav-item dropdown megamenu">
                                            <a href="/admin" className="nav-link">Admin</a>
                                        </li>
                                        :
                                        user.role === 2 ?
                                            <li className="nav-item dropdown megamenu">
                                                <a href="/instructor" className="nav-link">Instructor</a>
                                            </li>
                                            :
                                            <li className="nav-item dropdown megamenu">
                                                <a href="/all-courses" className="nav-link">Courses</a>
                                            </li>
                                    }

                                    <li className="nav-item dropdown simple-dropdown">
                                        <a href="/about" className="nav-link">About</a>
                                    </li>
                                    <li className="nav-item dropdown simple-dropdown">
                                        <a href="/gallery" className="nav-link">Gallery</a>
                                    </li>
                                    <li className="nav-item dropdown simple-dropdown">
                                        <a href="/partners" className="nav-link">Partners</a>
                                    </li>
                                    <li className="nav-item dropdown simple-dropdown">
                                        <a href="/contact" className="nav-link">Contact</a>
                                    </li>

                                    {user.name ?
                                        ""
                                        :
                                        <li className="nav-item dropdown simple-dropdown">
                                            <a href="/login" className="nav-link">
                                                    <span
                                                        className={"section-link btn btn-fancy btn-very-small btn-gradient-tan-geraldine btn-round-edge-small"}>Sign in</span>
                                            </a>
                                        </li>
                                    }
                                    {user.name ?
                                        user.role === 1 ?
                                            <li className="nav-item dropdown simple-dropdown user-nav-li">
                                                <a href="/admin/settings/password" title={"Settings"}
                                                   className="nav-link">
                                                        <span
                                                            className={"nav-user-actions"}>
                                                            <span className="material-icons-outlined">
                                                                <span className="material-icons-outlined">
                                                                    settings
                                                                </span>
                                                            </span>
                                                        </span>
                                                </a>
                                            </li>
                                            :
                                            user.role === 2 ?
                                                <li className="nav-item dropdown simple-dropdown user-nav-li">
                                                    <a href="/user/settings/password" title={"Settings"}
                                                       className="nav-link">
                                                            <span
                                                                className={"nav-user-actions"}>
                                                                <span className="material-icons-outlined">
                                                                    <span className="material-icons-outlined">
                                                                        settings
                                                                    </span>
                                                                </span>
                                                            </span>
                                                    </a>
                                                </li>
                                                :
                                                <li className="nav-item dropdown simple-dropdown user-nav-li">


                                                    <a href="/user/settings/password" title={"Settings"}
                                                       className="nav-link">
                                                            <span
                                                                className={"nav-user-actions"}>
                                                                <span className="material-icons-outlined">
                                                                    <span className="material-icons-outlined">
                                                                        settings
                                                                    </span>
                                                                </span>
                                                            </span>
                                                    </a>


                                                </li>
                                        :
                                        ""
                                    }
                                    {user.name ?
                                        <li className="nav-item dropdown simple-dropdown user-nav-li">
                                            <button style={{maxHeight: "20px", backgroundColor: "transparent", outline: "none", border: "none"}} title={"Logout"} className="nav-link"
                                                    onClick={this.onLogoutClick}>

                                                {this.state.logoutLoading === true ?
                                                    <CircularProgress style={{
                                                        color: "#232323",
                                                        padding: "10px",
                                                        marginTop: "-10px"
                                                    }}/>
                                                    :
                                                    <span
                                                        className={"nav-user-actions"}>
                                                        <span className="material-icons-outlined">
                                                            logout
                                                        </span>
                                                    </span>
                                                }

                                            </button>
                                        </li>
                                        :
                                        <li className="nav-item dropdown simple-dropdown">
                                            <a href="/register" className="nav-link">
                                                    <span
                                                        className={"section-link btn btn-fancy btn-very-small btn-gradient-tan-geraldine btn-round-edge-small"}>Sign up</span>
                                            </a>
                                        </li>
                                    }


                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>

                {/*<nav className="navbar navbar-expand-lg navbar-light">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="/">
                                <img src={"/docs/images/nav-logo-word.png"} className="navlogo" alt={"VoTechno Logo"}/>
                            </a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                    aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"/>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul style={{width: '100%'}} className="navbar-nav me-auto mb-2 mb-lg-0 con-right">
                                    <li className="nav-item conflict-solver-li">
                                        <a className="nav-link" href="/">Home</a>
                                    </li>

                                    <div className={"navDash"}>
                                        {user.role === 1 ?
                                            <li className="nav-item conflict-solver-li">
                                                <a className="nav-link" href="/admin">Admin</a>
                                            </li>
                                            : user.role === 2 ?
                                                <li className="nav-item conflict-solver-li">
                                                    <a className="nav-link"
                                                       href="/instructor">Instructor</a>
                                                </li>
                                                : user.role === 3 ?
                                                    <li className="nav-item conflict-solver-li">
                                                        <a className="nav-link"
                                                           href="/all-courses">Courses</a>
                                                    </li>
                                                    :
                                                    <li className="nav-item conflict-solver-li">
                                                        <a className="nav-link"
                                                           href="/all-courses">Courses</a>
                                                    </li>
                                        }
                                    </div>

                                    <li className="nav-item conflict-solver-li">
                                        <a className="nav-link" href="/about">About</a>
                                    </li>
                                    <li className="nav-item conflict-solver-li">
                                        <a className="nav-link" href="/gallery">Gallery</a>
                                    </li>
                                    <li className="nav-item conflict-solver-li">
                                        <a className="nav-link" href="/partners">Partners</a>
                                    </li>
                                    <li className="nav-item conflict-solver-li">
                                        <a className="nav-link" href="/contact">Contact</a>
                                    </li>

                                </ul>


                                {user.name ?

                                    <form className="d-flex">
                                        {user.role === 1 ?
                                            <a
                                                href={"/admin/settings/password"}
                                                className="btn icon-master-btn con-mid"
                                                style={{marginLeft: "10px"}}
                                                title="Log out">
                                                <i className="material-icons-outlined btn-icon">settings</i>
                                            </a>
                                            :
                                            user.role === 2 ?
                                                <a
                                                    href={"/instructor/settings/password"}
                                                    className="btn icon-master-btn con-mid"
                                                    style={{marginLeft: "10px"}}
                                                    title="Log out">
                                                    <i className="material-icons-outlined btn-icon">settings</i>
                                                </a>
                                                :
                                                <a
                                                    href={"/user/settings/password"}
                                                    className="btn icon-master-btn con-mid"
                                                    style={{marginLeft: "10px"}}
                                                    title="Log out">
                                                    <i className="material-icons-outlined btn-icon">settings</i>
                                                </a>
                                        }

                                        <button
                                            onClick={this.onLogoutClick}
                                            className="btn icon-master-btn con-mid"
                                            style={{marginLeft: "10px"}}
                                            title="Log out">
                                            <i className="material-icons-outlined btn-icon">logout</i>
                                        </button>
                                    </form>

                                    :

                                    <form className="d-flex">
                                        <a
                                            href={"/login"}
                                            className="nav-link conflict-a"
                                            title="Sign in">
                                            <span className="conflict-sign-nav radient-tan-geraldine">Sign in</span>
                                        </a>

                                        <a
                                            href={"/register"}
                                            className="nav-link conflict-a"
                                            title="Sign up">
                                            <span className="conflict-sign-nav radient-tan-geraldine">Sign up</span>
                                        </a>
                                    </form>

                                }


                            </div>
                        </div>
                    </nav>*/}

            </div>
        );
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {logoutUser}
)(Navbar);


//export default Navbar;
