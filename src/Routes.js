import React from "react";
import {
  Switch,
  Route
} from "react-router-dom";



//import LoginWithFacebook from './components/LoginWithFacebook';
import SignupWithCredentials from './components/SignupWithCredentials';
import SignInCredentials from './components/SignInCredentials';
import LogoutButton from './components/LogoutButton'; 
import Dashboard from './components/Dashboard';
// //socket
// import openSocket from 'socket.io-client';
 //import startSocket from './socketIO/socket';




const Routes = () => {

     
    //functions
    const LoginAndSIgnUp = () =>{
        return(<>
            <SignInCredentials />
            <SignupWithCredentials />
          </>
        )
    }

    // const PreSetUPDashboard = () =>{
    //       //open socket
    //      const  socket = openSocket('/');
    //      startSocket(socket);
    //      return(<>
    //         <Dashboard socket={socket}/>
    //         <LogoutButton/>
    //             </>)
    // }


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
                <>
            <Dashboard />
            <LogoutButton/>
                </>
          </Route>
        </Switch>
    )
}
  
  export default Routes;
