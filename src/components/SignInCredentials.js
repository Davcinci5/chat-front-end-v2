import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';

 import { SIGNIN_MUTATION } from '../schema/mutations';
 import { CURRENT_USER_QUERY } from '../schema/queries';

import PasswordComponent from './LoginAndSignUp/PasswordComponent';
import EmailComponent from './LoginAndSignUp/EmailComponent';

//react router
import { withRouter } from 'react-router-dom';

//internationalization
import translate from '../i18n/translate';


///css
import { Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
    root: {
        marginLeft: theme.spacing(60),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
  }));

const SignInCredentials = (props) =>{
//css
const classes = useStyles();

//Hooks 
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [error,setError] = useState({});

const [login] = useMutation(
    SIGNIN_MUTATION,
    {
        update:(cache, { data:{ login }})=>{
            cache.writeQuery({
                query: CURRENT_USER_QUERY,
                data: { currentUser: login.user },
            })
        }
    }
);

///F.P Methods
// Object ready to be sent to the server and verify 
// if user exists 
const createObjectUser = (email,password) =>{
    return {email,password}
}


const handlePasswordChange = (e) =>{
    setPassword(e.target.value);
}

const handleEmailChange = (e) =>{
    setEmail(e.target.value);
}
 
const handleSubmit = (e) =>{
    e.preventDefault();
    let user = createObjectUser(email,password);
    login({variables:user})
    .then(()=>props.history.push('/dashboard'))
    .catch((e)=>{
            setError({server:e.toString().split(":")[2]});
        });
}

const { loading,  data } = useQuery(CURRENT_USER_QUERY);
if (loading) return <div>Loading</div>;
const isLoggedIn = !!data.currentUser;
if(isLoggedIn){
    props.history.push('/dashboard');
}




return(
    <Container component="main" maxWidth="ls">
    <div className={classes.root}>
        <EmailComponent email={email} placeholder={translate("email")} handleEmailChange={handleEmailChange}/><br/>
       <PasswordComponent value={password} handlePassword = {handlePasswordChange}/><br/>
        {error.server && <span>{error.server}</span>}<br/>
        <Button type="submit"  variant="contained" color="primary" onClick={handleSubmit} disableElevation>{translate("login")}</Button> 
    </div>
   
    </Container>
    
);


};

export default withRouter(SignInCredentials);