import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { CURRENT_USER_QUERY } from '../schema/queries';
import { SIGNUP_MUTATION } from '../schema/mutations';

import BirthdayComponent from './BirthdayComponent';
import GenderComponent from './GenderComponent';
import PasswordComponent from './PasswordComponent';
import EmailComponent from './EmailComponent';
import FullNameComponent from './FullNameComponent';
import moment from 'moment';

//INTERNATIONALIZATION
import translate from '../i18n/translate';
import { useIntl } from 'react-intl';


const SignupWithCredentials = () => {
  //Hooks
  const [fullName,setFullName] = useState("");
  const [birthDay,setBirthday] = useState("");
  const [gender,setGender] = useState("");
  const [email,setEmail] = useState("");
  const [pass,setPass] = useState("");
  const [error,setError] = useState({});

  const [signup,] = useMutation(
    SIGNUP_MUTATION,
    {
      update: (cache, { data: { signup }}) => cache.writeQuery({
        query: CURRENT_USER_QUERY,
        data: { currentUser: signup.user },
      }),
    }
  );

  const handleNameChange = (e) =>{
    setFullName(e.target.value);
    
  }

  const handleEmailChange = (e) =>{
    setEmail(e.target.value);
  }

  const handlePassChange = (e) =>{
    setPass(e.target.value);
  } 

  const handleRadio =(e) =>{ 
  setGender(e.target.value);
  }
  
  const handleBirthday = (e) =>{ 
    setBirthday(e);
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    const fullNameregex = /[,;:<>0-9\-_!@#$%&\-=]/;
    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let errors = {};

    if(fullNameregex.test(fullName)||fullName.length === 0){
      errors.fullName = "fullNameError";
      setFullName("");
    }

    if(!emailRegex.test(email)){
      errors.email = "emailError";
    }

    if(pass.length === 0){
      errors.password = "passwordError";
    }

    if(gender === ""){
      errors.gender = "genderError";
    }

    //validating date
    let date = moment(birthDay,"YYYY MM DD");
   
    if(!date.isValid()){
      errors.birthday = "birthdayError";
    }

    let lenghtErrors = Object.keys(errors).length;

    if(lenghtErrors > 0){
       setError(errors);
    }else{

      let user = {
        fullName: fullName,
        birthday: birthDay,
        gender:gender,
        email:email,
        password:pass
      }

      signup({ variables: user })
      .catch((e)=>{
          setError({server:e.toString().split(":")[2]});
      }); 
    } 
  }

  return( 
    <form>
      <h3>{translate("createAccount")}</h3>
      {error.fullName && <span>{translate(error.fullName)}</span>}<br/>
      <FullNameComponent value={fullName} handleNameChange={handleNameChange}/><br/>
       {error.email && <span>{translate(error.email)}</span>}<br/>
       <EmailComponent email={email} handleEmailChange={handleEmailChange}/><br/>
       {error.password && <span>{translate(error.password)}</span>}<br/>
       <PasswordComponent value={pass} handlePassword = {handlePassChange}/><br/>
       {error.gender && <span>{translate(error.gender)}</span>}<br/>
        <GenderComponent handleRadio = {handleRadio}/>
        {error.birthday && <span>{translate(error.birthday)}</span>}<br/>
        <BirthdayComponent birthDayHandler={handleBirthday}/>
        {error.server && <span>{error.server}</span>}<br/>
        <input type="button" onClick={handleSubmit} value={useIntl().formatMessage({id:"createAccount"})}/> 
    </form>
  );
};

export default SignupWithCredentials;
