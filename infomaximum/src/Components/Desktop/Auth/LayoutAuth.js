import React from 'react';
import './layoutAuth.sass';


import Login from '../../../Components/Desktop/Auth/Login/Login';
import Registration from '../../../Components/Desktop/Auth/Registration/Registration';
import {Route, Switch} from "react-router-dom";

function LayoutAuth() {
  return (
      <main className="main-auth">
        <header>
        </header>
        <div className="auth">
          {/* Containers */}
          <Switch>
            <Route exact path="/login" component={Login}/>
            <Route path="/registration" component={Registration}/>
          </Switch>
          {/* /Containers */}
        </div>
      </main>
  );
}

export default LayoutAuth; // to APP