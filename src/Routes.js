import React from "react";
import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";



//import LoginWithFacebook from './components/LoginWithFacebook';
import SignupWithCredentials from './components/SignupWithCredentials';
import SignInCredentials from './components/SignInCredentials';
import LogoutButton from './components/LogoutButton'; 
import Dashboard from './components/Dashboard';



const Routes = () => {

     
    //functions
    const LoginAndSIgnUp = () =>{
        return(<>
            <SignInCredentials />
            <SignupWithCredentials />
          </>
        )
    }


    return (
        <Switch>
          <Route exact path="/">
              <LoginAndSIgnUp/>
          </Route>
          <Route exact path="/login">
              <LoginAndSIgnUp/>
          </Route>
          <Route exact path="/signup">
              <LoginAndSIgnUp/>
          </Route>
          <Route exact path="/dashboard">
              <Dashboard/>
              <LogoutButton/>
          </Route>
        </Switch>
    )
}
  
  export default Routes;
