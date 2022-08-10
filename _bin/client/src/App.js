import React, {Component} from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import {setCurrentUser, logoutUser} from "./actions/authActions";
import {Provider} from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import About from "./components/layout/About";
import Gallery from "./components/layout/Gallery";
import Partners from "./components/layout/Partners";
import Contact from "./components/layout/Contact";
import Privacy from "./components/legal/Privacy";
import Terms from "./components/legal/Terms";
import NotFound from "./components/layout/Notfound";
import AcceptVerification from "./components/layout/VerificationAccept";
import PublicCourses from "./components/user/public-courses"
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Verification from "./components/user/verification";
import Forgot from "./components/auth/Forgot";
import ForgotSuccess from "./components/auth/forgotSuccess";
import ForgotChange from "./components/auth/ForgotChange";
import Admin from "./components/admin/Dashboard";
import Instructor from "./components/instructor/Dashboard";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/user/Dashboard";
import AdminUsers from "./components/admin/users";
import AdminUsersEdit from "./components/admin/edit-user";
import AdminInstructorAssign from "./components/admin/assign-course"
import AdminHomepage from "./components/admin/homepage"
import AdminAddPast from "./components/admin/add-past"
import AdminAddTeam from "./components/admin/add-team"
import AdminEditPast from "./components/admin/edit-past"
import AdminEditTeam from "./components/admin/edit-team"

import AdminGallery from "./components/admin/gallery"
import AdminEditGallery from "./components/admin/edit-gallery"
import AdminAddGallery from "./components/admin/add-gallery"
import AdminRedhat from "./components/admin/redhat"
import AdminEditRedhat from "./components/admin/edit-redhat"
import AdminAddRedhat from "./components/admin/add-redhat"


import AdminCourses from "./components/admin/courses";
import AdminCoursesAddNew from "./components/admin/add-course";
import AdminCourseEdit from "./components/admin/edit-course";
import AdminLessons from "./components/admin/lesson";
import AdminLessonAddNew from "./components/admin/add-lesson";
import AdminTopicsAddNew from "./components/admin/add-topic"
import AdminLessonEdit from "./components/admin/edit-lesson";
import AdminEditTopic from "./components/admin/edit-topic";
import AdminTopicVideo from "./components/admin/topic-video"
import AdminZoom from "./components/admin/zoom"

import InstructorCourses from "./components/instructor/courses";
import InstructorCoursesAddNew from "./components/instructor/add-course";
import InstructorCourseEdit from "./components/instructor/edit-course";
import InstructorLessons from "./components/instructor/lesson";
import InstructorLessonAddNew from "./components/instructor/add-lesson";
import InstructorTopicsAddNew from "./components/instructor/add-topic"
import InstructorLessonEdit from "./components/instructor/edit-lesson";
import InstructorEditTopic from "./components/instructor/edit-topic";
import InstructorTopicVideo from "./components/instructor/topic-video"
import InstructorZoom from "./components/instructor/zoom"

import AdminUserPayments from "./components/admin/payments"
import AdminUserApprovedPayments from "./components/admin/approved-payments"

import AdminInstructors from "./components/admin/instructors";
import AdminNewInstructor from "./components/admin/new-instructor";
import AdminSuperAdmins from "./components/admin/superadmins";
import AdminNewSuperAdmin from "./components/admin/new-superadmin";

import AdminPaymentView from "./components/admin/paymentView"
import UserCoursePayment from "./components/user/course-payment";
import UserCourse from "./components/user/course";
import AdminPasswordChange from "./components/admin/edit-password";
import InstructorPasswordChange from "./components/instructor/edit-password";
import UserPasswordChange from "./components/user/edit-password";
import UserCoursePaymentPending from "./components/user/course-payment-pending";

import "./App.css";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
    // Set auth token header auth
    const token = localStorage.jwtToken;
    setAuthToken(token);
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));
    // Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logoutUser());

        // Redirect to login
        window.location.href = "./login";
    }
}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">

                        <Navbar/>

                        <Switch>
                            <Route exact path="/" component={Landing}/>
                            <Route exact path="/about" component={About}/>
                            <Route exact path="/privacy" component={Privacy}/>
                            <Route exact path="/terms" component={Terms}/>
                            <Route exact path="/gallery" component={Gallery}/>
                            <Route exact path="/partners" component={Partners}/>
                            <Route exact path="/contact" component={Contact}/>
                            <Route exact path="/all-courses" component={PublicCourses}/>
                            <Route exact path="/verify-email/:id" component={AcceptVerification}/>
                            <Route exact path="/register" component={Register}/>
                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/forgot" component={Forgot}/>
                            <Route exact path="/forgot-success" component={ForgotSuccess}/>
                            <Route exact path="/forgot-change-password" component={ForgotChange}/>

                            <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                            <PrivateRoute exact path="/instructor" component={Instructor}/>
                            <PrivateRoute exact path="/verification" component={Verification}/>

                            <PrivateRoute exact path="/admin" component={Admin}/>
                            <PrivateRoute exact path="/admin/users" component={AdminUsers}/>
                            <PrivateRoute exact path="/admin/users/edit/:id" component={AdminUsersEdit}/>
                            <PrivateRoute exact path="/admin/users/payments" component={AdminUserPayments}/>
                            <PrivateRoute exact path="/admin/users/approved-payments"
                                          component={AdminUserApprovedPayments}/>
                            <PrivateRoute exact path="/admin/users/payments/view/:id" component={AdminPaymentView}/>
                            <PrivateRoute exact path="/admin/instructors/assign/:id" component={AdminInstructorAssign}/>
                            <PrivateRoute exact path="/admin/homepage/" component={AdminHomepage}/>
                            <PrivateRoute exact path="/admin/past/new" component={AdminAddPast}/>
                            <PrivateRoute exact path="/admin/team/new" component={AdminAddTeam}/>
                            <PrivateRoute exact path="/admin/past/edit/:id" component={AdminEditPast}/>
                            <PrivateRoute exact path="/admin/team/edit/:id" component={AdminEditTeam}/>
                            <PrivateRoute exact path="/admin/admin-gallery" component={AdminGallery}/>
                            <PrivateRoute exact path="/admin/admin-gallery/add" component={AdminAddGallery}/>
                            <PrivateRoute exact path="/admin/admin-gallery/edit/:id" component={AdminEditGallery}/>
                            <PrivateRoute exact path="/admin/redhat" component={AdminRedhat}/>
                            <PrivateRoute exact path="/admin/redhat/add" component={AdminAddRedhat}/>
                            <PrivateRoute exact path="/admin/redhat/edit/:id" component={AdminEditRedhat}/>

                            <PrivateRoute exact path="/admin/instructors" component={AdminInstructors}/>
                            <PrivateRoute exact path="/admin/instructors/new" component={AdminNewInstructor}/>
                            <PrivateRoute exact path="/admin/super-admins" component={AdminSuperAdmins}/>
                            <PrivateRoute exact path="/admin/super-admins/new" component={AdminNewSuperAdmin}/>

                            <PrivateRoute exact path="/admin/zoom/:id" component={AdminZoom}/>
                            <PrivateRoute exact path="/admin/courses" component={AdminCourses}/>
                            <PrivateRoute exact path="/admin/courses/new" component={AdminCoursesAddNew}/>
                            <PrivateRoute exact path="/admin/courses/edit/:id" component={AdminCourseEdit}/>
                            <PrivateRoute exact path="/admin/lessons/:id" component={AdminLessons}/>
                            <PrivateRoute exact path="/admin/lessons/new/:id" component={AdminLessonAddNew}/>
                            <PrivateRoute exact path="/admin/lessons/edit/:id" component={AdminLessonEdit}/>
                            <PrivateRoute exact path="/admin/topics/new/:id" component={AdminTopicsAddNew}/>
                            <PrivateRoute exact path="/admin/topics/edit/:id" component={AdminEditTopic}/>
                            <PrivateRoute exact path="/admin/topics/video/:id" component={AdminTopicVideo}/>

                            <PrivateRoute exact path="/instructor/zoom/:id" component={InstructorZoom}/>
                            <PrivateRoute exact path="/instructor/courses" component={InstructorCourses}/>
                            <PrivateRoute exact path="/instructor/courses/new" component={InstructorCoursesAddNew}/>
                            <PrivateRoute exact path="/instructor/courses/edit/:id" component={InstructorCourseEdit}/>
                            <PrivateRoute exact path="/instructor/lessons/:id" component={InstructorLessons}/>
                            <PrivateRoute exact path="/instructor/lessons/new/:id" component={InstructorLessonAddNew}/>
                            <PrivateRoute exact path="/instructor/lessons/edit/:id" component={InstructorLessonEdit}/>
                            <PrivateRoute exact path="/instructor/topics/new/:id" component={InstructorTopicsAddNew}/>
                            <PrivateRoute exact path="/instructor/topics/edit/:id" component={InstructorEditTopic}/>
                            <PrivateRoute exact path="/instructor/topics/video/:id" component={InstructorTopicVideo}/>

                            <PrivateRoute exact path="/admin/settings/password/" component={AdminPasswordChange}/>
                            <PrivateRoute exact path="/instructor/settings/password/"
                                          component={InstructorPasswordChange}/>
                            <PrivateRoute exact path="/user/settings/password/" component={UserPasswordChange}/>

                            <PrivateRoute exact path="/course-payment/:id" component={UserCoursePayment}/>
                            <PrivateRoute exact path="/course-payment-pending/:id"
                                          component={UserCoursePaymentPending}/>
                            <PrivateRoute exact path="/course/:id" component={UserCourse}/>


                            <Route exact path="/about-us-votechno-institute">
                                <Redirect to={"/about"}/>
                            </Route>
                            <Route exact path="/whatpeoplesay/our-institute">
                                <Redirect to={"/about"}/>
                            </Route>
                            <Route exact path="/contact-us-votechno">
                                <Redirect to={"/contact"}/>
                            </Route>
                            <Route exact path="/courses">
                                <Redirect to={"/all-courses"}/>
                            </Route>
                            <Route exact path="/aws-courses-votechno">
                                <Redirect to={"/all-courses"}/>
                            </Route>

                            <Route component={NotFound} />
                        </Switch>

                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
