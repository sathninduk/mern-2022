import React, {Component} from "react";
import axios from "axios";

//axios.defaults.baseURL = process.env.APP_URL
const baseURL = require("../../config/keys").API_URL;


class Notfound extends Component {
    state = {
        skeleton: false,
        team: []
    }

    componentDidMount = () => {
        this.setState({skeleton: true});
        axios.get(baseURL + `/api/u/home/team`, {}).then((res) => {
            const team = res.data;
            this.setState({team});
            this.setState({skeleton: false});
        }).catch(err => {
            console.log(err);
            this.setState({skeleton: true});
        })
    }

    render() {
        return (
            <div style={{marginTop: "130px", padding: "0 30px 30px"}}>
                <style>{"\
                    h1 {\
                        font-size: 40px;\
                        line-height: 40px;\
                    }\
                    h2 {\
                        font-size: 30px;\
                        line-height: 40px;\
                        margin: 60px 0 20px 0;\
                    }\
                    p{\
                        line-height: 25px;\
                    }\
                    @media screen and (min-width: 768px) { .not-found-page-body {\
                        width: 700px;\
                    }}\
                    .not-found-page-body {\
                        border: 1px solid rgba(0,0,0,.2);\
                        padding: 50px 40px;\
                        border-radius: 10px;\
                }\
                "}</style>

                <div style={{width: "100%"}} className={"con-mid"}>
                    <div className={"not-found-page-body"}>
                        <h1>Oops! 404</h1>
                        <span>Sorry, The page not found</span>
                    </div>
                </div>

                <br/>
                <p className={"legal-footer-text"} style={{textAlign: "center"}}>
                    <strong>©</strong><span>{new Date().getFullYear()}</span> VoTechno
                    Institute - Powered by <a
                    href="https://www.coduza.com/"
                    className="text-decoration-line-bottom text-extra-dark-gray text-salmon-rose-hover font-weight-500">CODUZA</a>
                </p>
            </div>
        );
    }
}

export default Notfound;
