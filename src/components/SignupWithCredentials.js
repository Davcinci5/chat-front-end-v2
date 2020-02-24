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
      errors.fullName = "Full name only contains letters";
      setFullName("");
    }

    if(!emailRegex.test(email)){
      errors.email = "Email Format Invalid";
    }

    if(pass.length === 0){
      errors.password = "Enter a password";
    }

    if(gender === ""){
      errors.gender = "Select a gender"
    }

    //validating date
    let date = moment(birthDay,"YYYY MM DD");
   
    if(!date.isValid()){
      errors.birthday = "Invalid Date, please verify birthday";
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
      <h3>Sign Up</h3>
      {error.fullName && <span>{error.fullName}</span>}<br/>
      <FullNameComponent value={fullName} handleNameChange={handleNameChange}/><br/>
       {error.email && <span>{error.email}</span>}<br/>
       <EmailComponent email={email} handleEmailChange={handleEmailChange}/><br/>
       {error.password && <span>{error.password}</span>}<br/>
       <PasswordComponent value={pass} handlePassword = {handlePassChange}/><br/>
       {error.gender && <span>{error.gender}</span>}<br/>
        <GenderComponent handleRadio = {handleRadio}/>
        {error.birthday && <span>{error.birthday}</span>}<br/>
        <BirthdayComponent birthDayHandler={handleBirthday}/>
        {error.server && <span>{error.server}</span>}<br/>
        <input type="button" onClick={handleSubmit} value="Submit"/> 
    </form>
  );
};

export default SignupWithCredentials;
