import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {registerUser} from "../../actions/authActions";
import classnames from "classnames";
import {TextField} from "@material-ui/core";
//import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "react-router-dom/Link";
import {Helmet} from "react-helmet";

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            tel: "",
            email: "",
            password: "",
            password2: "",
            loading: false,
            errors: {}
        };
    }

    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.setState({loading: false});
            this.props.history.push("/dashboard");
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({loading: false});
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange = e => {
        this.setState({[e.target.id]: e.target.value});
    };

    onSubmit = e => {
        this.setState({loading: true});
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            tel: this.state.tel,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };

        this.props.registerUser(newUser, this.props.history);
    };

    render() {
        const {errors} = this.state;

        return (
            <div className={"mother login-mother reg-mother con-mid"}>
                <Helmet>
                    <title>Register</title>
                </Helmet>
                <div style={{
                    width: "100%",
                    height: "100%",
                    backgroundImage: "url(/docs/images/vectors/reg-2.png)",
                    position: "absolute",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "700px",
                    backgroundPosition: "right top"
                }}>
                    {/*this.state.loading === true ?
                    <LinearProgress style={{zIndex: "1000000"}}/> : ""
                */}
                    <style>{"\
                        .navbar {\
                            display: none !important;\
                        }\
                    "}
                    </style>
                    <div className="container">
                        <div className="row">
                            <div className="col s8 offset-s2">

                                <div className={"login-card form-card con-mid"} style={{paddingTop: "40px"}}>
                                    <div className={"form-box login-box"}
                                         style={{
                                             backgroundColor: "rgba(0,0,0,0)",
                                             boxShadow: "none",
                                             borderRadius: "10px",
                                             border: "none",
                                             marginBottom: "53px"
                                         }}>
                                        <div className={"form-inner"}
                                             style={{
                                                 backgroundColor: "rgba(0,0,0,0)",
                                                 boxShadow: "none",
                                                 border: "none"
                                             }}>
                                            <div className="col s12">

                                                <div style={{width: "100%", height: "60px", marginBottom: "20px"}}
                                                     className={"con-mid"}>
                                                    <a href={'/'} target={"_self"}>
                                                        <img src={"/docs/images/nav-logo-word.png"}
                                                             title="VoTechno Institute"
                                                             alt={"votechno logo"} style={{width: "200px"}}/>
                                                    </a>
                                                </div>

                                                <h4 style={{
                                                    color: "#000000",
                                                    background: "none",
                                                    WebkitTextFillColor: "#000000",
                                                    textAlign: "left",
                                                    marginBottom: "-5px"
                                                }}>
                                                    <b>Register</b>
                                                </h4>

                                                <p className="grey-text text-darken-1">
                                                    Already have an account? <Link style={{color: '#007FFF'}}
                                                                                   to="/login">Log
                                                    in</Link>
                                                </p>
                                            </div>
                                            <form noValidate onSubmit={this.onSubmit}>
                                                <div style={{marginBottom: "24px"}}>
                                                    <TextField
                                                        variant={"filled"}
                                                        style={{width: "100%"}}
                                                        label={"Name"}
                                                        onChange={this.onChange}
                                                        value={this.state.name}
                                                        error={errors.name}
                                                        id="name"
                                                        type="text"
                                                        className={classnames("", {
                                                            invalid: errors.name
                                                        })}
                                                    />
                                                    <span className="red-text">{errors.name}</span>
                                                </div>
                                                <div style={{marginBottom: "24px"}}>
                                                    <TextField
                                                        variant={"filled"}
                                                        style={{width: "100%"}}
                                                        label={"Contact number"}
                                                        onChange={this.onChange}
                                                        value={this.state.tel}
                                                        error={errors.tel}
                                                        id="tel"
                                                        type="text"
                                                        className={classnames("", {
                                                            invalid: errors.tel
                                                        })}
                                                    />
                                                    <span className="red-text">{errors.tel}</span>
                                                </div>
                                                <div style={{marginBottom: "24px"}}>
                                                    <TextField
                                                        variant={"filled"}
                                                        style={{width: "100%"}}
                                                        label={"Email"}
                                                        onChange={this.onChange}
                                                        value={this.state.email}
                                                        error={errors.email}
                                                        id="email"
                                                        type="email"
                                                        className={classnames("", {
                                                            invalid: errors.email
                                                        })}
                                                    />
                                                    <span className="red-text">{errors.email}</span>
                                                </div>
                                                <div style={{marginBottom: "24px"}}>
                                                    <TextField
                                                        variant={"filled"}
                                                        style={{width: "100%"}}
                                                        label={"Password"}
                                                        onChange={this.onChange}
                                                        value={this.state.password}
                                                        error={errors.password}
                                                        id="password"
                                                        type="password"
                                                        className={classnames("", {
                                                            invalid: errors.password
                                                        })}
                                                    />
                                                    <span className="red-text">{errors.password}</span>
                                                </div>
                                                <div style={{marginBottom: "24px"}}>
                                                    <TextField
                                                        variant={"filled"}
                                                        style={{width: "100%"}}
                                                        label={"Confirm Password"}
                                                        onChange={this.onChange}
                                                        value={this.state.password2}
                                                        error={errors.password2}
                                                        id="password2"
                                                        type="password"
                                                        className={classnames("", {
                                                            invalid: errors.password2
                                                        })}
                                                    />
                                                    <span className="red-text">{errors.password2}</span>
                                                </div>
                                                <div className="col s12">
                                                    <button
                                                        style={{
                                                            width: "100%",
                                                            height: "48px"
                                                        }}
                                                        type="submit"
                                                        className="btn btn-full-blue"
                                                    >{this.state.loading === true ?
                                                        <CircularProgress style={{
                                                            color: "#ffffff",
                                                            padding: "10px",
                                                            marginTop: "-4px"
                                                        }}/> : "Sign up"
                                                    }
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    {registerUser}
)(withRouter(Register));
