import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authActions";
import axios from "axios";

import Carousel from 'react-elastic-carousel'
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

        axios.get(baseURL + `/api/u/home/past`, {}).then((res) => {

            this.setState({errorOpen: false});
            this.setState({loading: false});
            this.setState({skeleton: false});

            const student = res.data;
            this.setState({student});

        }).catch((err) => {
            this.setState({errorOpen: true});
            this.setState({loading: false});
            this.setState({skeleton: true});
        });

        this.setState({skeleton2: true});
        axios.get(baseURL + `/api/u/home/courses`, {}).then((res) => {
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
        return (
            <div style={{backgroundColor: "#ffffff"}}>


                <Helmet>
                    <title>VoTechno Institute</title>
                </Helmet>
                

                {/* start header */}
                <header className="header-with-topbar">
                </header>
                {/* end header */}
                {/* start revolution slider section */}
                <div className={"head-banner"}>
                    <section className="p-0 position-relative home-yoga-meditation md-no-overlap-section no-transition">
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
                                            {/* Leaves layer */}
                                            <div className="tp-caption tp-resizeme rs-parallaxlevel-4 yoga-leaves"
                                                 data-x="['center','center','center','center']"
                                                 data-hoffset="['40','0','0','0']"
                                                 data-y="['bottom','bottom','bottom','bottom']"
                                                 data-voffset="['-280','-190','0','0']" data-width="auto"
                                                 data-height="auto"
                                                 data-whitespace="nowrap" data-responsive_offset="on"
                                                 data-responsive="off"
                                                 data-type="shape"
                                                 data-frames="[{&quot;delay&quot;:2000,&quot;speed&quot;:2000,&quot;frame&quot;:&quot;0&quot;,&quot;from&quot;:&quot;opacity:0;fb:30px;y:150px&quot;,&quot;to&quot;:&quot;opacity:1;fb:0;y:0&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;},{&quot;delay&quot;:&quot;wait&quot;,&quot;speed&quot;:600,&quot;frame&quot;:&quot;999&quot;,&quot;to&quot;:&quot;auto:auto;fb:0;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;}]"
                                                 style={{zIndex: 999, pointerEvents: 'none'}}>
                                                <img src="docs/images/home-yoga-meditation-slider-leaves.png" alt=""
                                                     data-ww="['1650px','950','850','500']"
                                                     data-hh="['auto','auto','auto','auto']" width={1500} height={1000}
                                                     data-no-retina style={{zIndex: -20}}/></div>
                                            {/* woman layer */}
                                            <div
                                                className="tp-caption tp-no-events tp-shape tp-shapewrapper rs-parallaxlevel-2 yoga-woman"
                                                data-x="['center','center','center','center']"
                                                data-hoffset="['0','0','0','0']"
                                                data-y="['bottom','bottom','bottom','bottom']"
                                                data-voffset="['-275','-120','-20','-50']" data-width="auto"
                                                data-height="auto" data-whitespace="nowrap" data-responsive_offset="on"
                                                data-responsive="on" data-type="shape"
                                                data-frames="[{&quot;delay&quot;:1200,&quot;speed&quot;:2000,&quot;frame&quot;:&quot;0&quot;,&quot;from&quot;:&quot;opacity:0;fb:30px;&quot;,&quot;to&quot;:&quot;opacity:1;fb:0;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;},{&quot;delay&quot;:&quot;wait&quot;,&quot;speed&quot;:600,&quot;frame&quot;:&quot;999&quot;,&quot;to&quot;:&quot;auto:auto;fb:0;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;}]"
                                                style={{zIndex: 999, pointerEvents: 'none'}}>
                                                <img src="docs/images/home-yoga-meditation-slider-women.png" alt=""
                                                     data-ww="['1500px','1250px','800px','650px']"
                                                     data-hh="['auto','auto','auto','auto']" width={1500} height={1000}
                                                     data-no-retina/></div>
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
                                                style={{fontWeight: 300}}>We're extra expert in
                                            </div>
                                            {/* experience text layer */}
                                            <div
                                                className="tp-caption alt-font text-white tp-resizeme font-weight-700 rs-parallaxlevel-1 yoga-main-text"
                                                id="slide-1-layer-5" data-x="['center','center','center','center']"
                                                data-hoffset="['0','0','0','0']"
                                                data-y="['top','middle','middle','middle']"
                                                data-voffset="['121','-465','-295','-325']" data-whitespace="nowrap"
                                                data-type="text"
                                                data-typewriter="{&quot;lines&quot;:&quot;Docker,AWS,Kubernetes,Terraform,Ansible,DevOps,Python,Java,Web Dev&quot;,&quot;enabled&quot;:&quot;off&quot;,&quot;speed&quot;:&quot;60&quot;,&quot;delays&quot;:&quot;1%7C100&quot;,&quot;looped&quot;:&quot;on&quot;,&quot;cursorType&quot;:&quot;one&quot;,&quot;blinking&quot;:&quot;off&quot;,&quot;word_delay&quot;:&quot;off&quot;,&quot;sequenced&quot;:&quot;on&quot;,&quot;hide_cursor&quot;:&quot;off&quot;,&quot;start_delay&quot;:&quot;1500&quot;,&quot;newline_delay&quot;:&quot;1000&quot;,&quot;deletion_speed&quot;:&quot;20&quot;,&quot;deletion_delay&quot;:&quot;3000&quot;,&quot;blinking_speed&quot;:&quot;500&quot;,&quot;linebreak_delay&quot;:&quot;60&quot;,&quot;cursor_type&quot;:&quot;two&quot;,&quot;background&quot;:&quot;off&quot;}"
                                                data-responsive_offset="on" data-fontsize="['165','165','130','90']"
                                                data-lineheight="['130','130','30','90']"
                                                data-letterspacing="['-8','-8','-8','-4']"
                                                data-frames="[{&quot;from&quot;:&quot;o:1&quot;,&quot;speed&quot;:2500,&quot;to&quot;:&quot;o:1;&quot;,&quot;delay&quot;:500,&quot;ease&quot;:&quot;Power4.easeOut&quot;},{&quot;delay&quot;:&quot;wait&quot;,&quot;speed&quot;:300,&quot;to&quot;:&quot;opacity:0;&quot;,&quot;ease&quot;:&quot;nothing&quot;}]"
                                                data-textalign="['center','center','center','center']" style={{
                                                zIndex: 7,
                                                whiteSpace: 'nowrap',
                                                textShadow: '0 0 30px rgba(0,0,0,0.15)'
                                            }}>Linux
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
                    className="big-section bg-very-light-desert-storm overlap-height overflow-visible md-no-overlap-section">
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
                        <div className="row margin-8-rem-top overlap-gap-section md-margin-6-rem-top">
                            <div className="col-12 col-md-6 wow animate__fadeIn" data-wow-delay="0.1s">
                                <h5 className="alt-font font-weight-500 line-height-46px letter-spacing-minus-1px w-95 text-dark-purple m-md-0 lg-w-100 sm-line-height-32px">
                                    A powerful and effective method of helping to bridge the gap
                                    between education and the world of work.
                                </h5>
                            </div>
                            <div className="col-12 col-lg-5 col-md-6 offset-lg-1 wow animate__fadeIn"
                                 data-wow-delay="0.3s">
                                <p className="line-height-32px w-95">
                                    VoTechno Institute was established in 2017 with the foremost intent to offer
                                    training for certain job fields and services in specific sectors. Since VoTechno
                                    training often begins in high school, students can graduate prepared to take a
                                    high-paying, skilled job immediately. Also, Our Training provides the learner with
                                    “hands-on” experience and allows interaction with the facilitator and other
                                    participants to discuss and question learning material.
                                </p>
                                <a href="./about"
                                   className="btn btn-link thin btn-extra-large text-dark-purple font-weight-600">Discover
                                    about
                                    us</a>
                            </div>
                        </div>
                    </div>
                </section>
                {/* end section */}
                {/* start section */}
                <section className="pt-lg-0 pb-0 overflow-visible">
                    <div className="container">
                        <div className="row justify-content-center overlap-section">

                        </div>
                    </div>
                </section>
                {/* end section */}
                {/* start section */}
                <section className="pt-0 big-section wow animate__fadeIn why_votechno">
                    <div className="container">
                        <div className="row align-items-center justify-content-center">
                            <div
                                className="col-12 col-lg-5 md-margin-5-rem-bottom xs-margin-5-rem-top wow animate__fadeIn">
                                <span
                                    className="alt-font font-weight-500 text-salmon-rose text-uppercase d-block">Why you must choose</span>
                                <h5 className="alt-font font-weight-500 text-dark-purple line-height-46px margin-4-rem-bottom w-85 letter-spacing-minus-1px lg-w-100 md-margin-10px-bottom xs-line-height-30px">
                                    VoTechno?
                                </h5>
                                <div className="panel-group accordion-event accordion-style-02 w-85 lg-w-100"
                                     id="accordion1" data-active-icon="icon-feather-minus"
                                     data-inactive-icon="icon-feather-plus">
                                    <p>
                                        We welcome you to VoTechno Institute and encourage you to view us as your
                                        starting point towards a successful career and future. We at VoTechno groom
                                        students to transform into individuals who are competent to contribute to the
                                        global economy. Our dedicated team is committed to provide quality education,
                                        support and guidance to individuals searching for a vocational centre,
                                        vocational-technical training and vocational education courses.
                                    </p>
                                </div>
                            </div>
                            <div className="col-12 col-lg-6 offset-lg-1 home-yoga-meditation wow animate__fadeIn"
                                 data-wow-delay="0.4s">
                                <div className="outside-box-right position-relative">
                                    <img src="docs/images/home-yoga-meditation-benefits-of-yoga-img.jpg"
                                         className="overflow-hidden border-radius-4px" alt=""/>
                                    <a href="https://www.youtube.com/watch?v=36KIvQm4IS0"
                                       className="popup-youtube absolute-middle-center video-icon-box video-icon-extra-large left-0px wow animate__fadeIn"
                                       data-wow-delay="0.2s" rel="noopener noreferrer" target={"_blank"}>
                    <span>
                      <span className="video-icon bg-white box-shadow-large">
                        <i className="fas fa-play text-salmon-rose"/>
                      </span>
                    </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* end section */}
                {/* start section */}
                <section id="classes" className="bg-very-light-desert-storm overlap-height">
                    <div className="container">
                        <div className="row align-items-end margin-6-rem-bottom">
                            <div className="col-12 col-xl-6 col-lg-8 text-center text-lg-start wow animate__fadeIn">
                                <span
                                    className="alt-font font-weight-500 text-salmon-rose text-uppercase d-block">Explore the best</span>
                                <h5 className="alt-font font-weight-500 text-dark-purple line-height-46px m-lg-0 letter-spacing-minus-1px d-inline-block md-line-height-36px md-w-70 xs-w-100">
                                    On-demand Courses in Industry</h5>
                            </div>
                            <div className="col-12 col-xl-6 col-lg-4 text-center text-lg-end wow animate__fadeIn">
                                <a href="./all-courses"
                                   className="btn btn-link thin btn-extra-large text-dark-purple font-weight-600">Explore
                                    courses</a>
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
                                            <a className="alt-font font-weight-600 text-small text-dark-purple text-salmon-rose-hover text-uppercase d-flex align-items-center"
                                               href={"./course-payment/" + course._id}>Watch course<i
                                                className="feather icon-feather-arrow-right icon-extra-small ms-auto"/></a>
                                        </div>
                                    </div>
                                )}
                            {/* end services item */}

                        </div>
                    </div>
                </section>
                {/* end section */}
                {/* start section */}
                <section className="pt-lg-0 overflow-visible wow animate__fadeIn">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-12 text-center overlap-section">
                                <div className="overlap-section-inner">
                                    <h3 className="alt-font text-salmon-rose title-extra-large letter-spacing-minus-3px font-weight-700 mb-0">
                                        student voices</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* end section */}
                <section className="pt-0">
                    <div className="container">
                        {/*<div className="row justify-content-center">
                            <div className="col-12 col-lg-10 position-relative padding-10-rem-lr sm-padding-7-rem-lr xs-padding-6-rem-lr wow animate__fadeIn">
                                <div className="swiper-container slider-custom-text black-move" data-slider-options="{ &quot;loop&quot;: true, &quot;keyboard&quot;: { &quot;enabled&quot;: true, &quot;onlyInViewport&quot;: true }, &quot;autoplay&quot;: { &quot;delay&quot;: 5000, &quot;disableOnInteraction&quot;: false }, &quot;navigation&quot;: { &quot;nextEl&quot;: &quot;.swiper-button-next-nav&quot;, &quot;prevEl&quot;: &quot;.swiper-button-previous-nav&quot; }, &quot;effect&quot;: &quot;slide&quot; }">
                                    <div className="swiper-wrapper">*/}
                        {this.state.skeleton === true ?
                            <div style={{width: "100%", height: "200px"}} className={"con-mid"}>
                                <CircularProgress/>
                            </div>
                            :
                            <Carousel loop style={{zIndex: "100"}}>
                                {this.state.student.map(student =>
                                    <div className={"con-mid"}>
                                        <img alt="" src="docs/images/home-yoga-meditation-icon-quote.jpg"
                                             className="w-70px margin-50px-bottom xs-w-50px xs-margin-25px-bottom"
                                             data-no-retina/>
                                        <p className="legend"
                                           style={{marginBottom: "30px"}}>{student.body}</p>

                                        <div style={{textAlign: "left"}}>
                                            <div style={{display: "inline-block", marginRight: "20px"}}>
                                                <img src={baseURL + "/public/past/" + student.file}
                                                     style={{width: "80px", height: "80px", borderRadius: "100px", marginBottom: "20px"}} alt={""}/>
                                            </div>
                                            <div style={{display: "inline-block"}}>
                                                <p className="legend"
                                                   style={{
                                                       marginBottom: "-5px",
                                                       textTransform: "uppercase"
                                                   }}>
                                                    <span className={"student-name"}>{student.name}</span></p>
                                                <p className="legend student-title"
                                                   style={{color: "#f6f6f6", fontSize: "12px"}}>{student.title}</p>
                                            </div>
                                        </div>


                                    </div>
                                )}
                            </Carousel>
                        }
                    </div>
                </section>
                {/* start section */}
                <section className="border-top border-color-extra-light-gray wow animate__fadeIn"
                         style={{padding: "30px 30px 0 30px"}}>
                    <div className="container">
                        <div className="row row-cols-2 row-cols-lg-6 row-cols-sm-4 justify-content-center">
                            {/* start services item */}
                            <div className="col md-margin-40px-bottom wow animate__fadeIn" data-wow-delay="0.2s">
                                <div className="feature-box">
                                    <div className="feature-box-icon margin-30px-bottom md-margin-30px-bottom">
                                        <img
                                            className="w-100px padding-10px-all"
                                            src="docs/images/badges/logo-1.png" alt=""/>
                                    </div>
                                </div>
                            </div>
                            {/* end services item */}
                            {/* start services item */}
                            <div className="col md-margin-40px-bottom wow animate__fadeIn" data-wow-delay="0.2s">
                                <div className="feature-box">
                                    <div className="feature-box-icon margin-30px-bottom md-margin-30px-bottom">
                                        <img
                                            className="w-100px padding-10px-all"
                                            src="docs/images/badges/logo-2.png" alt=""/>
                                    </div>
                                </div>
                            </div>
                            {/* end services item */}
                            {/* start services item */}
                            <div className="col md-margin-40px-bottom wow animate__fadeIn" data-wow-delay="0.2s">
                                <div className="feature-box">
                                    <div className="feature-box-icon margin-30px-bottom md-margin-30px-bottom">
                                        <img
                                            className="w-100px padding-10px-all"
                                            src="docs/images/badges/logo-3.png" alt=""/>
                                    </div>
                                </div>
                            </div>
                            {/* end services item */}
                            {/* start services item */}
                            <div className="col md-margin-40px-bottom wow animate__fadeIn" data-wow-delay="0.2s">
                                <div className="feature-box">
                                    <div className="feature-box-icon margin-30px-bottom md-margin-30px-bottom">
                                        <img
                                            className="w-100px padding-10px-all"
                                            src="docs/images/badges/logo-4.png" alt=""/>
                                    </div>
                                </div>
                            </div>
                            {/* end services item */}
                            {/* start services item */}
                            <div className="col md-margin-40px-bottom wow animate__fadeIn" data-wow-delay="0.2s">
                                <div className="feature-box">
                                    <div className="feature-box-icon margin-30px-bottom md-margin-30px-bottom">
                                        <img
                                            className="w-100px padding-10px-all"
                                            src="docs/images/badges/logo-5.png" alt=""/>
                                    </div>
                                </div>
                            </div>
                            {/* end services item */}
                            {/* start services item */}
                            <div className="col md-margin-40px-bottom wow animate__fadeIn" data-wow-delay="0.2s">
                                <div className="feature-box">
                                    <div className="feature-box-icon margin-30px-bottom md-margin-30px-bottom">
                                        <img
                                            className="w-100px padding-10px-all"
                                            src="docs/images/badges/logo-6.png" alt=""/>
                                    </div>
                                </div>
                            </div>
                            {/* end services item */}

                            {/* start services item */}
                            <div className="col md-margin-40px-bottom wow animate__fadeIn" data-wow-delay="0.2s">
                                <div className="feature-box">
                                    <div className="feature-box-icon margin-30px-bottom md-margin-30px-bottom">
                                        <img
                                            className="w-100px padding-10px-all"
                                            src="docs/images/badges/logo-7.png" alt=""/>
                                    </div>
                                </div>
                            </div>
                            {/* end services item */}
                            {/* start services item */}
                            <div className="col md-margin-40px-bottom wow animate__fadeIn" data-wow-delay="0.2s">
                                <div className="feature-box">
                                    <div className="feature-box-icon margin-30px-bottom md-margin-30px-bottom">
                                        <img
                                            className="w-100px padding-10px-all"
                                            src="docs/images/badges/logo-8.png" alt=""/>
                                    </div>
                                </div>
                            </div>
                            {/* end services item */}
                            {/* start services item */}
                            <div className="col md-margin-40px-bottom wow animate__fadeIn" data-wow-delay="0.2s">
                                <div className="feature-box">
                                    <div className="feature-box-icon margin-30px-bottom md-margin-30px-bottom">
                                        <img
                                            className="w-100px padding-10px-all"
                                            src="docs/images/badges/logo-9.png" alt=""/>
                                    </div>
                                </div>
                            </div>
                            {/* end services item */}
                            {/* start services item */}
                            <div className="col md-margin-40px-bottom wow animate__fadeIn" data-wow-delay="0.2s">
                                <div className="feature-box">
                                    <div className="feature-box-icon margin-30px-bottom md-margin-30px-bottom">
                                        <img
                                            className="w-100px padding-10px-all"
                                            src="docs/images/badges/logo-10.png" alt=""/>
                                    </div>
                                </div>
                            </div>
                            {/* end services item */}
                            {/* start services item */}
                            <div className="col md-margin-40px-bottom wow animate__fadeIn" data-wow-delay="0.2s">
                                <div className="feature-box">
                                    <div className="feature-box-icon margin-30px-bottom md-margin-30px-bottom">
                                        <img
                                            className="w-100px padding-10px-all"
                                            src="docs/images/badges/logo-11.png" alt=""/>
                                    </div>
                                </div>
                            </div>
                            {/* end services item */}
                            {/* start services item */}
                            <div className="col md-margin-40px-bottom wow animate__fadeIn" data-wow-delay="0.2s">
                                <div className="feature-box">
                                    <div className="feature-box-icon margin-30px-bottom md-margin-30px-bottom">
                                        <img
                                            className="w-100px padding-10px-all"
                                            src="docs/images/badges/logo-12.png" alt=""/>
                                    </div>
                                </div>
                            </div>
                            {/* end services item */}
                            {/* start services item */}
                            <div className="col md-margin-40px-bottom wow animate__fadeIn" data-wow-delay="0.2s">
                                <div className="feature-box">
                                    <div className="feature-box-icon margin-30px-bottom md-margin-30px-bottom">
                                        <img
                                            className="w-100px padding-10px-all"
                                            src="docs/images/badges/logo-13.png" alt=""/>
                                    </div>
                                </div>
                            </div>
                            {/* end services item */}

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
