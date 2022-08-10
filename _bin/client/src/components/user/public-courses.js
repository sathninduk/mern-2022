import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authActions";
import {Redirect} from "react-router-dom";
import axios from "axios";
import LinearProgress from "@mui/material/LinearProgress";

import {CircularProgress} from "@material-ui/core";
import {Helmet} from "react-helmet";

//axios.defaults.baseURL = process.env.APP_URL
const baseURL = require("../../config/keys").API_URL;

class PublicCourses extends Component {

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    state = {
        loading: false,
        courses: []
    }

    componentDidMount = () => {
        this.setState({loading: true});
        axios.get(baseURL + `/api/u/pub-courses`, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': 'x-access-token',
                'x-access-token': localStorage.getItem("jwtToken")
            }
        }).then((res) => {
            const courses = res.data;
            courses.sort();
            this.setState({courses});
            this.setState({loading: false});
        }).catch((err) => {
            this.setState({loading: false}, () => {
            });
        });

        /*
                axios.get(baseURL + `/api/admin/security/check-point`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Headers': 'x-access-token',
                        'x-access-token': localStorage.getItem("jwtToken")
                    }
                }).then((res) => {
                    if (res.data.length === 1) {
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
                });
                */


    }


    render() {

        const {user} = this.props.auth;

        if (user.role === 1) {
            return <Redirect to="/admin"/>
        } else if (user.role === 2) {
            return <Redirect to="/instructor"/>
        } else {

            return (
                <div style={{backgroundColor: "#ffffff"}}>
                    <Helmet>
                        <title>Courses</title>
                    </Helmet>
                    {this.state.loading === true ?
                        <div style={{width: "100%"}}>
                            <LinearProgress/>
                        </div>
                        : ""}
                    {/* start section */}
                    {
                        this.state.verification === false ?
                            <Redirect to="/verification"/> : ""
                    }
                    <section
                        className="big-section bg-very-light-desert-storm overlap-height overflow-visible md-no-overlap-section public-courses-top-padding"
                        style={{paddingBottom: "80px"}}>
                        <div className="container">
                            {/* here */}
                            <div className="container">
                                <div className="row align-items-end margin-6-rem-bottom">
                                    <div
                                        className="col-12 col-xl-6 col-lg-8 text-center text-lg-start wow animate__fadeIn">
                                <span
                                    className="alt-font font-weight-500 text-salmon-rose text-uppercase d-block">Explore the best</span>
                                        <h5 className="alt-font font-weight-500 text-dark-purple line-height-46px m-lg-0 letter-spacing-minus-1px d-inline-block md-line-height-36px md-w-70 xs-w-100">
                                            Courses by VoTechno</h5>
                                    </div>
                                </div>
                                <div
                                    className="row row-cols-1 row-cols-lg-3 row-cols-sm-2 justify-content-center margin-3-rem-bottom md-no-margin-bottom">

                                    {/* start services item */}
                                    {this.state.loading === true ?
                                        <div style={{width: "100%", height: "300px"}} className={"con-mid"}>
                                            <CircularProgress/>
                                        </div>
                                        :
                                        this.state.courses.map(course =>
                                            <div
                                                className="col md-margin-30px-bottom xs-margin-15px-bottom wow animate__fadeIn ondemand-courses"
                                                data-wow-delay="0.2s">
                                                <div
                                                    className="position-relative bg-white padding-3-half-rem-all box-shadow-small new-box">
                                                    <div
                                                        className="bg-dark-purple text-small alt-font text-white text-uppercase position-absolute font-weight-500 top-minus-15px right-0px padding-5px-tb padding-20px-lr">
                                                        {course.fee === 0 ? "FREE" : "LKR " + course.fee.toString().split(".")[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ".00"}
                                                    </div>
                                                    <span
                                                        className="alt-font font-weight-500 text-extra-medium text-extra-dark-gray d-block margin-10px-bottom">{course.name}</span>
                                                    <div
                                                        className="w-100 h-1px bg-medium-light-gray margin-20px-bottom d-inline-block"/>

                                                    {user.email ?

                                                        <a className="alt-font font-weight-600 text-small text-dark-purple text-salmon-rose-hover text-uppercase d-flex align-items-center"
                                                           href={"./course-payment/" + course._id} target={"_self"}>Watch
                                                            course<i
                                                                className="feather icon-feather-arrow-right icon-extra-small ms-auto"/></a>

                                                        :

                                                        <a className="alt-font font-weight-600 text-small text-dark-purple text-salmon-rose-hover text-uppercase d-flex align-items-center"
                                                           href={"/login"} target={"_self"}>Watch
                                                            course<i
                                                                className="feather icon-feather-arrow-right icon-extra-small ms-auto"/></a>
                                                    }

                                                </div>
                                            </div>
                                        )}
                                    {/* end services item */}

                                </div>
                            </div>
                        </div>
                    </section>
                    {/* end section */}
                    {/* start section */}
                    <section
                        className="padding-100px-tb md-padding-75px-tb sm-padding-50px-tb wow animate__fadeIn footer-contact">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div
                                    className="col-12 col-xl-5 col-lg-4 md-margin-50px-bottom sm-margin-30px-bottom last-paragraph-no-margin wow animate__fadeIn"
                                    data-wow-delay="0.6s">
                                    <h5 className="alt-font font-weight-500 text-dark-purple w-70 d-inline-block letter-spacing-minus-1px m-0 lg-w-100 md-w-50 xs-w-70">
                                        Please feel free to get in touch with us</h5>
                                    <br/>
                                    <div style={{marginTop: "20px"}}>
                                        <a href={"./privacy"}>Privacy Policy</a>
                                        <span>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>
                                        <a href={"./terms"}>Terms and Conditions</a>
                                    </div>
                                </div>
                                {/* start feature box item */}
                                <div
                                    className="col-12 col-xl-3 col-lg-4 col-sm-6 xs-margin-30px-bottom last-paragraph-no-margin wow animate__fadeInRight"
                                    data-wow-delay="0.4s">
                                    <div className="feature-box feature-box-left-icon">
                                        <div className="feature-box-icon margin-5px-top">
                                            <i className="line-icon-Geo2-Love icon-extra-medium text-salmon-rose d-block"/>
                                        </div>
                                        <div className="feature-box-content">
                                        <span
                                            className="text-dark-purple text-uppercase text-medium font-weight-500 alt-font margin-5px-bottom d-block">VoTechno Institute</span>
                                            <p className="m-0">165A, Weliwita Junction, New Kandy Road, Malabe, Sri
                                                Lanka</p>
                                        </div>
                                    </div>
                                </div>
                                {/* end feature box item */}
                                {/* start feature box item */}
                                <div
                                    className="col-12 col-xl-3 offset-xl-1 col-lg-4 col-sm-6 last-paragraph-no-margin wow animate__fadeInRight"
                                    data-wow-delay="0.6s">
                                    <div className="feature-box feature-box-left-icon">
                                        <div className="feature-box-icon margin-5px-top">
                                            <i className="line-icon-Mail icon-extra-medium text-salmon-rose d-block"/>
                                        </div>
                                        <div className="feature-box-content">
                                        <span
                                            className="text-dark-purple text-uppercase text-medium font-weight-500 alt-font margin-5px-bottom d-block">How can we help?</span>
                                            <p className="m-0"><a href="mailto:info@votechno.com"
                                                                  className="text-salmon-rose-hover">info@votechno.com</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {/* end features box item */}
                            </div>
                        </div>
                    </section>
                    {/* end section */}
                    {/* start footer */}
                    <footer className="footer-light border-top border-color-medium-gray padding-50px-tb">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-12 col-md-3 text-center text-md-start sm-margin-20px-bottom">
                                    <a href="./" className="footer-logo"><img
                                        src="docs/images/nav-logo-word.png"
                                        data-at2x="docs/images/nav-logo-word.png" alt=""/></a>
                                </div>
                                <div
                                    className="col-12 col-md-6 text-center last-paragraph-no-margin sm-margin-20px-bottom">
                                    <p className={"legal-footer-text"}>
                                        <strong>©</strong><span>{new Date().getFullYear()}</span> VoTechno Institute -
                                        Powered by <a
                                        href="https://www.coduza.com/"
                                        className="text-decoration-line-bottom text-extra-dark-gray text-salmon-rose-hover font-weight-500">CODUZA</a>
                                    </p>
                                </div>
                                <div className="col-12 col-md-3 text-center text-md-end">
                                    <div className="social-icon-style-12">
                                        <ul className="extra-small-icon">
                                            <li key={"key-1"}><a className="facebook"
                                                                 href="https://www.facebook.com/Votechno/"
                                                                 rel="noopener noreferrer" target="_blank"><i
                                                className="fab fa-facebook-f"/></a></li>
                                            <li key={"key-2"}><a className="linkedin"
                                                                 href="https://www.linkedin.com/in/votechno-institute/"
                                                                 rel="noopener noreferrer" target="_blank"><i
                                                className="fab fa-linkedin"/></a></li>
                                            <li key={"key-3"}><a className="instagram"
                                                                 href="https://www.instagram.com/votechno_institute/"
                                                                 rel="noopener noreferrer" target="_blank"><i
                                                className="fab fa-instagram"/></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </footer>
                    {/* end footer */}
                    {/* start scroll to top */}

                    {/*<a className="scroll-top-arrow" href={"javascript:void(0);"} title={"scroll to top"}><i
                        className="feather icon-feather-arrow-up"/></a>*/}

                </div>
            );
        }
    }
}

PublicCourses.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {logoutUser}
)(PublicCourses);
