import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { SIGNIN_MUTATION } from '../schema/mutations';
import { CURRENT_USER_QUERY } from '../schema/queries';

import PasswordComponent from './PasswordComponent';
import EmailComponent from './EmailComponent';
 

import translate from '../i18n/translate';
import { useIntl } from 'react-intl';


const SignInCredentials = () =>{
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
    login({variables:user}).
        catch((e)=>{
            setError({server:e.toString().split(":")[2]});
        });
}

return(
    <>
    <form>
     <h3>{translate("login")}</h3>
        {error.email && <span>{error.email}</span>}<br/>
        <EmailComponent email={email} placeholder={translate("email")} handleEmailChange={handleEmailChange}/><br/>
       {error.password && <span>{error.password}</span>}<br/>
       <PasswordComponent value={password} handlePassword = {handlePasswordChange}/><br/>
        {error.server && <span>{error.server}</span>}<br/>
       <input type="button" onClick={handleSubmit} value={useIntl().formatMessage({id:"login"})}/> 
    </form>
    </>
    
);


};

export default SignInCredentials;