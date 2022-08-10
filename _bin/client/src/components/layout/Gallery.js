import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authActions";
import axios from "axios";

import {CircularProgress} from "@material-ui/core";
import {Helmet} from "react-helmet";

//axios.defaults.baseURL = process.env.APP_URL
const baseURL = require("../../config/keys").API_URL;

class Landing extends Component {

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    state = {
        errorOpen: false,
        delProcess: false,
        disProcess: false,
        eProcess: false,
        loading: false,
        skeleton: false,
        skeleton2: false,
        student: [],
        courses: [],
        payments: [],
    }

    componentDidMount = () => {

        this.setState({skeleton: true});
        this.setState({loading: true});

        let rightArrow = document.getElementsByClassName("rec-arrow-right");
        let i;
        for (i = 0; i < rightArrow.length; i++) {
            rightArrow[i].style.backgroundColor = "red";
        }

        this.setState({skeleton2: true});
        axios.get(baseURL + `/api/u/gallery`, {}).then((res) => {
            this.setState({errorOpen: false});
            this.setState({loading: false});
            this.setState({skeleton2: false});
            const courses = res.data;
            this.setState({courses});
        }).catch((err) => {
            this.setState({errorOpen: true});
            this.setState({loading: false});
            this.setState({skeleton2: true});
        });
    }


    render() {

        const imgModal = (id, file) => {
            //alert("Great Shot!" + ", " + file);
            let modal = document.getElementById("modal-" + id);
            modal.style.display = "block";
        }

        const modalClose = (id) => {
            let modal = document.getElementById("modal-" + id);
            modal.style.display = "none";
        }

        return (
            <div style={{backgroundColor: "#ffffff"}}>


                <Helmet>
                    <title>Gallery</title>
                </Helmet>

                

                {this.state.courses.map(course =>
                    <div
                        id={"modal-" + course._id}
                        className={"gallery-modal"}
                        style={{display: "none"}}
                        onClick={() => modalClose(course._id)}
                    >

                        <div style={{height: "10%"}}>
                            <div className={"gal-mod-close"}>
                            <span id={"mod-close"} onClick={() => modalClose(course._id)}
                                  className="material-icons-outlined" style={{color: "#ffffff"}}>close</span>
                            </div>
                        </div>

                        <div className={"con-mid"} style={{width: "100%", height: "90%"}}>
                            <img src={baseURL + "/public/gallery/" + course.file} alt={""} />
                        </div>

                    </div>)}

                {/* start header */}
                <header className="header-with-topbar">
                </header>
                {/* end header */}
                {/* start revolution slider section */}
                <style>{"\
                    @media (max-width: 991px) {\
                        .head-hello {\
                            height: 50vh!important;\
                            }\
                        }\
                    "}
                </style>
                <div className={"head-banner"}>
                    <section style={{height: '50vh'}}
                             className="p-0 position-relative home-yoga-meditation md-no-overlap-section no-transition head-hello">
                        <article className="content">
                            <div id="rev_slider_26_1_wrapper" className="rev_slider_wrapper fullscreenbanner-container"
                                 data-alias="cleanproductshowcase" data-source="gallery"
                                 style={{background: '#fff', padding: '0px'}}>
                                {/* START REVOLUTION SLIDER 5.4.3.3 fullscreen mode */}
                                <div id="rev_slider_26_1"
                                     className="rev_slider tp-overflow-hidden fullscreenabanner bg-transparent-gradient-magenta-orange"
                                     style={{display: 'none'}} data-version="5.4.3.3">
                                    <ul>
                                        <li key={"key-4"} data-index="rs-971" data-transition="fade"
                                            data-slotamount="default"
                                            data-hideafterloop={0} data-hideslideonmobile="off" data-easein="default"
                                            data-easeout="default" data-masterspeed={300}
                                            data-thumb="docs/images/thumb.jpg"
                                            data-rotate={0} data-saveperformance="off" data-title="Slide"
                                            data-param1={1}
                                            data-description>
                                            {/* MAIN IMAGE */}
                                            <img src="docs/images/home-yoga-meditation-slider-bg.jpg"
                                                 data-bgcolor="#ffffff"
                                                 style={{background: '#ffffff', backgroundSize: 'cover'}} alt=""
                                                 data-bgposition="center center" data-bgfit="cover"
                                                 data-bgrepeat="no-repeat" data-bgparallax="off" className="rev-slidebg"
                                                 data-no-retina/>
                                            {/* LAYERS */}
                                            {/* small circle bg layer  */}
                                            <div className="tp-caption tp-no-events tp-shape tp-shapewrapper"
                                                 data-x="['center','center','center','center']"
                                                 data-hoffset="['0','0','0','0']"
                                                 data-y="['bottom','bottom','bottom','bottom']"
                                                 data-voffset="['-300','-100','-20','0']"
                                                 data-width="['900','900','600','500']"
                                                 data-height="['900','900','600','500']" data-whitespace="nowrap"
                                                 data-type="shape" data-responsive="on" data-responsive_offset="on"
                                                 data-frames="[{&quot;delay&quot;:100,&quot;speed&quot;:3000,&quot;frame&quot;:&quot;0&quot;,&quot;from&quot;:&quot;opacity:0;fb:30px;sX:0;sY:0&quot;,&quot;to&quot;:&quot;opacity:1;fb:0;sX:1;sY:1&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;},{&quot;delay&quot;:&quot;wait&quot;,&quot;speed&quot;:3000,&quot;frame&quot;:&quot;0&quot;,&quot;from&quot;:&quot;opacity:1;&quot;,&quot;to&quot;:&quot;opacity:1;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;}]"
                                                 data-blendmode="normal" style={{
                                                zIndex: 5,
                                                pointerEvents: 'none',
                                                borderRadius: '100%',
                                                background: 'linear-gradient(rgb(87 180 255), rgb(42 142 223))',
                                                boxShadow: '0 10px 20px rgba(0,0,0,0.01)'
                                            }}/>
                                            {/* big circle bg layer  */}
                                            <div className="tp-caption tp-no-events tp-shape tp-shapewrapper"
                                                 data-x="['center','center','center','center']"
                                                 data-hoffset="['0','0','0','0']"
                                                 data-y="['bottom','bottom','bottom','bottom']"
                                                 data-voffset="['-450','-250','-155','-70']"
                                                 data-width="['1200','1200','850','650']"
                                                 data-height="['1200','1200','850','650']" data-whitespace="nowrap"
                                                 data-type="shape" data-responsive="on" data-responsive_offset="on"
                                                 data-frames="[{&quot;delay&quot;:100,&quot;speed&quot;:3000,&quot;frame&quot;:&quot;0&quot;,&quot;from&quot;:&quot;opacity:0;fb:30px;sX:0;sY:0&quot;,&quot;to&quot;:&quot;opacity:0.3;fb:0;sX:1;sY:1&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;},{&quot;delay&quot;:&quot;wait&quot;,&quot;speed&quot;:3000,&quot;frame&quot;:&quot;0&quot;,&quot;from&quot;:&quot;opacity:1;&quot;,&quot;to&quot;:&quot;opacity:1;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;}]"
                                                 data-blendmode="normal" style={{
                                                zIndex: 0,
                                                pointerEvents: 'none',
                                                borderRadius: '100%',
                                                background: 'linear-gradient(rgb(99 181 245), rgb(65 152 230))',
                                                boxShadow: '0 10px 20px rgba(0,0,0,0.01)'
                                            }}/>
                                            {/* Journey of the self text layer */}
                                            <div
                                                className="tp-caption tp-resizeme alt-font text-extra-large text-white yoga-small-text"
                                                data-x="['center','center','center','center']"
                                                data-hoffset="['-313','0','0','0']" data-y="['top','top','top','top']"
                                                data-voffset="['92','100','100','20']" data-width="none"
                                                data-height="none"
                                                data-whitespace="nowrap" data-fontsize="['27','37','27','27']"
                                                data-lineheight="['35','37','35','35']"
                                                data-letterspacing="['-0.4','-0.4','-0.4','-0.4']" data-type="text"
                                                data-responsive_offset="on" data-responsive="on"
                                                data-frames="[{&quot;delay&quot;:2000,&quot;speed&quot;:1000,&quot;frame&quot;:&quot;0&quot;,&quot;from&quot;:&quot;x:[100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;&quot;,&quot;mask&quot;:&quot;x:[-100%];y:0px;s:inherit;e:inherit;&quot;,&quot;to&quot;:&quot;o:1;&quot;,&quot;ease&quot;:&quot;Power4.easeInOut&quot;},{&quot;delay&quot;:&quot;wait&quot;,&quot;speed&quot;:300,&quot;frame&quot;:&quot;999&quot;,&quot;to&quot;:&quot;opacity:0;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;}]"
                                                data-textalign="['left','left','center','center']"
                                                style={{fontWeight: 300}}>VoTechno Institute
                                            </div>
                                            {/* experience text layer */}
                                            <div
                                                className="tp-caption alt-font text-white tp-resizeme font-weight-700 rs-parallaxlevel-1 yoga-main-text"
                                                id="slide-1-layer-5" data-x="['center','center','center','center']"
                                                data-hoffset="['0','0','0','0']"
                                                data-y="['top','middle','middle','middle']"
                                                data-voffset="['121','-465','-295','-325']" data-whitespace="nowrap"
                                                data-type="text"
                                                data-typewriter="{&quot;lines&quot;:&quot;&quot;,&quot;enabled&quot;:&quot;off&quot;,&quot;speed&quot;:&quot;60&quot;,&quot;delays&quot;:&quot;1%7C100&quot;,&quot;looped&quot;:&quot;on&quot;,&quot;cursorType&quot;:&quot;one&quot;,&quot;blinking&quot;:&quot;off&quot;,&quot;word_delay&quot;:&quot;off&quot;,&quot;sequenced&quot;:&quot;on&quot;,&quot;hide_cursor&quot;:&quot;off&quot;,&quot;start_delay&quot;:&quot;1500&quot;,&quot;newline_delay&quot;:&quot;1000&quot;,&quot;deletion_speed&quot;:&quot;20&quot;,&quot;deletion_delay&quot;:&quot;3000&quot;,&quot;blinking_speed&quot;:&quot;500&quot;,&quot;linebreak_delay&quot;:&quot;60&quot;,&quot;cursor_type&quot;:&quot;two&quot;,&quot;background&quot;:&quot;off&quot;}"
                                                data-responsive_offset="on" data-fontsize="['165','165','130','90']"
                                                data-lineheight="['130','130','30','90']"
                                                data-letterspacing="['-8','-8','-8','-4']"
                                                data-frames="[{&quot;from&quot;:&quot;o:1&quot;,&quot;speed&quot;:2500,&quot;to&quot;:&quot;o:1;&quot;,&quot;delay&quot;:500,&quot;ease&quot;:&quot;Power4.easeOut&quot;},{&quot;delay&quot;:&quot;wait&quot;,&quot;speed&quot;:300,&quot;to&quot;:&quot;opacity:0;&quot;,&quot;ease&quot;:&quot;nothing&quot;}]"
                                                data-textalign="['center','center','center','center']" style={{
                                                zIndex: 7,
                                                whiteSpace: 'nowrap',
                                                textShadow: '0 0 30px rgba(0,0,0,0.15)'
                                            }}>Gallery
                                            </div>
                                            {/* top separator line layer */}
                                            <div
                                                className="tp-caption tp-no-events tp-shape tp-shapewrapper rs-parallaxlevel-1 yoga-top-line"
                                                id="slide-1-layer-6" data-x="['center','center','center','center']"
                                                data-hoffset="['-10','0','0','0']"
                                                data-y="['top','middle','middle','middle']"
                                                data-voffset="['151','-502','-322','-345']"
                                                data-width="['796','472','656','430']" data-height="['1','1','1','1']"
                                                data-whitespace="nowrap" data-type="shape" data-responsive="off"
                                                data-responsive_offset="on"
                                                data-frames="[{&quot;delay&quot;:1500,&quot;speed&quot;:2000,&quot;frame&quot;:&quot;0&quot;,&quot;from&quot;:&quot;o:1&quot;,&quot;to&quot;:&quot;o:1;&quot;,&quot;ease&quot;:&quot;Power4.easeInOut&quot;}]"
                                                data-blendmode="normal" style={{background: 'rgba(255,255,255,0.5)'}}>
                                            </div>
                                            {/* Bottom separator line layer */}
                                            <div
                                                className="tp-caption tp-no-events tp-shape tp-shapewrapper rs-parallaxlevel-1 yoga-bottom-line"
                                                id="slide-1-layer-7" data-x="['center','center','center','center']"
                                                data-hoffset="['20','25','20','0']"
                                                data-y="['top','middle','middle','middle']"
                                                data-voffset="['243','-410','-250','-295']"
                                                data-width="['760','451','629','430']" data-height="['1','1','1','1']"
                                                data-whitespace="nowrap" data-type="shape" data-responsive="off"
                                                data-responsive_offset="on"
                                                data-frames="[{&quot;delay&quot;:1500,&quot;speed&quot;:2000,&quot;frame&quot;:&quot;0&quot;,&quot;from&quot;:&quot;o:1&quot;,&quot;to&quot;:&quot;o:1;&quot;,&quot;ease&quot;:&quot;Power4.easeInOut&quot;}]"
                                                data-blendmode="normal"
                                                style={{background: 'rgba(255,255,255,0.5)', zIndex: 6}}/>
                                        </li>
                                    </ul>
                                </div>
                                {/* END REVOLUTION SLIDER */}
                            </div>
                        </article>
                    </section>
                </div>
                {/* end revolution slider section */}
                {/* start section */}
                <section
                    className="big-section bg-very-light-desert-storm overlap-height overflow-visible md-no-overlap-section"
                    style={{paddingBottom: "80px"}}>
                    <div className="container">
                        <div className="overlap-section">
                            <div
                                className="box-shadow-large bg-white border-radius-6px padding-3-rem-tb padding-4-rem-lr lg-padding-3-rem-lr sm-padding-1-rem-lr">
                                <div className="row d-flex align-items-center justify-content-center">
                                    <div
                                        className="col-12 col-lg-auto text-center text-lg-start md-margin-10px-bottom wow animate__fadeIn">
                                        <span
                                            className="alt-font text-extra-large font-weight-600 text-gradient-tan-geraldine text-uppercase">VoTechno Institute</span>
                                    </div>
                                    <div
                                        className="col-12 col-lg-auto text-center text-lg-end padding-20px-lr lg-padding-10px-lr md-padding-15px-lr md-margin-20px-bottom wow animate__fadeIn">
                                        <div
                                            className="padding-30px-lr d-block d-sm-inline-block align-middle border-right border-color-medium-gray lg-padding-15px-lr xs-no-border-right xs-margin-10px-bottom">
                                            <span
                                                className="alt-font font-weight-500 text-uppercase line-height-18px d-block ">Instructor led virtual training</span>
                                        </div>
                                    </div>
                                    <div className="col-12 col-lg-auto text-center text-lg-end">
                                        <a href="./all-courses"
                                           className="section-link btn btn-fancy btn-very-small btn-gradient-tan-geraldine btn-round-edge-small">Watch
                                            courses</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* here */}
                        <div className="container" style={{marginTop: "80px"}}>
                            <div className="row align-items-end margin-6-rem-bottom">
                                <div className="col-12 col-xl-6 col-lg-8 text-center text-lg-start wow animate__fadeIn">
                                <span
                                    className="alt-font font-weight-500 text-salmon-rose text-uppercase d-block">VoTechno</span>
                                    <h5 className="alt-font font-weight-500 text-dark-purple line-height-46px m-lg-0 letter-spacing-minus-1px d-inline-block md-line-height-36px md-w-70 xs-w-100">
                                        Gallery</h5>
                                </div>
                                <div className="col-12 col-xl-6 col-lg-4 text-center text-lg-end wow animate__fadeIn">
                                    <a href="https://www.instagram.com/votechno_institute/" target={"_blank"}
                                       rel="noopener noreferrer"
                                       className="btn btn-link thin btn-extra-large text-dark-purple font-weight-600">Explore
                                        on more instagram</a>
                                </div>
                            </div>
                            <div
                                className="row row-cols-1 row-cols-lg-3 row-cols-sm-2 justify-content-center margin-3-rem-bottom md-no-margin-bottom">

                                {/* start services item */}
                                {this.state.skeleton2 === true ?
                                    <div style={{width: "100%", height: "300px"}} className={"con-mid"}>
                                        <CircularProgress/>
                                    </div>
                                    :
                                    this.state.courses.map(course =>
                                        <div
                                            className="col-12 col-lg-4 col-md-6 col-sm-8 md-margin-30px-bottom xs-margin-15px-bottom wow animate__flipInY"
                                            data-wow-delay="0.2s" style={{
                                            visibility: 'visible',
                                            animationDelay: '0.2s',
                                            animationName: 'flipInY',
                                            marginBottom: "30px"
                                        }}>
                                            <div className="rm-rotate-box text-center">
                                                <div className="flipper to-left">
                                                    <div className="thumb-wrap">
                                                        <div className="front border-radius-4px overflow-hidden"
                                                             style={{backgroundImage: 'url("' + baseURL + '/public/gallery/' + course.file + '")'}}>

                                                            {course.title ?
                                                                <div
                                                                    className={"opacity-extra-medium-2 bg-transparent-gradiant-white-black"}/>
                                                                :
                                                                <div
                                                                    className={"opacity-extra-medium-2"}/>
                                                            }

                                                            <div className="content-wrap padding-15px-lr">
                                                                <span
                                                                    className="text-white opacity-6 text-medium text-uppercase letter-spacing-1-half alt-font d-block"
                                                                    style={{
                                                                        color: 'white',
                                                                        opacity: 1
                                                                    }}><strong>{course.title}</strong></span>
                                                            </div>
                                                        </div>
                                                        <div onClick={() => imgModal(course._id, course.file)} className="back border-radius-4px overflow-hidden">
                                                            <div className="overlay-bg bg-gradient-tan-geraldine"/>
                                                            <div
                                                                className="content-wrap padding-60px-all lg-padding-30px-lr md-padding-40px-lr xs-padding-30px-all">
                                                                <span
                                                                    className="text-white text-extra-medium letter-spacing-1px font-weight-500 text-uppercase alt-font d-block margin-10px-bottom">{course.title}</span>
                                                                <p className="text-white opacity-7">{course.body}</p>
                                                                <button id={course.file}
                                                                        onClick={() => imgModal(course._id, course.file)}
                                                                        className="btn btn-link thin btn-extra-large text-extra-dark-gray">Watch
                                                                    Photo
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
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
                <section className="padding-100px-tb md-padding-75px-tb sm-padding-50px-tb wow animate__fadeIn">
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
                            <div className="col-12 col-md-6 text-center last-paragraph-no-margin sm-margin-20px-bottom">
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

Landing.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {logoutUser}
)(Landing);
