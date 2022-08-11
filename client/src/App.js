import React, {Component} from 'react';
import {Switch, Route} from "react-router-dom";

// components
import Login from "./components/Login";
import Reset from "./components/Reset";

import CreateUser from "./components/Admin/CreateUser";
import UserList from "./components/Admin/UserList";

import CreateNotes from "./components/User/CreateNotes";
import Notes from "./components/User/Notes";
import UpdateNotes from "./components/User/UpdateNotes";

import NotFound from "./components/Layout/NotFound";

class App extends Component {
  render() {
    return (
        <div className="App">
          <Switch>
              <Route exact path={"/"} component={Login} />
              <Route exact path={"/reset"} component={Reset} />

              {/* Admin */}
              <Route exact path={"/create-user"} component={CreateUser} />
              <Route exact path={"/users"} component={UserList} />

              {/* User */}
              <Route exact path={"/create-note"} component={CreateNotes} />
              <Route exact path={"/notes"} component={Notes} />
              <Route exact path={"/note/update/:id"} component={UpdateNotes} />
              <Route exact path={"/update-note"} component={UpdateNotes} />

              <Route exact component={NotFound} />
          </Switch>
        </div>
    );
  }
}

export default App;
