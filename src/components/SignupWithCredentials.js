import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { CURRENT_USER_QUERY } from '../schema/queries';
import { SIGNUP_MUTATION } from '../schema/mutations';

import BirthdayComponent from './LoginAndSignUp/BirthdayComponent';
import GenderComponent from './LoginAndSignUp/GenderComponent';
import PasswordComponent from './LoginAndSignUp/PasswordComponent';
import EmailComponent from './LoginAndSignUp/EmailComponent';
import FullNameComponent from './LoginAndSignUp/FullNameComponent';
import moment from 'moment';

//react router
import { withRouter } from 'react-router-dom';

//INTERNATIONALIZATION
import translate from '../i18n/translate';

///css
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';

import Grid from '@material-ui/core/Grid';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    
  },
}));


const SignupWithCredentials = (props) => {
  //css
  const classes = useStyles();
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
      .then(()=>props.history.push('/dashboard'))
      .catch((e)=>{
          setError({server:e.toString().split(":")[2]});
      }); 
    } 
  }

  return( 
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
      <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
        {translate("createAccount")}
        </Typography>
      <form >
      <Grid container
  direction="row"
  justify="space-between"
  alignItems="flex-end" >
      <Grid  item xs={12} >
      {error.fullName && <span>{translate(error.fullName)}</span>}<br/>
      <FullNameComponent value={fullName} handleNameChange={handleNameChange}/><br/>
      </Grid>
       <Grid  item xs={12} >
       {error.email && <span>{translate(error.email)}</span>}<br/>
       <EmailComponent email={email} handleEmailChange={handleEmailChange}/><br/>
       </Grid>
       <Grid  item xs={12} >
       {error.password && <span>{translate(error.password)}</span>}<br/>
       <PasswordComponent value={pass} handlePassword = {handlePassChange}/><br/>
       </Grid>
       <Grid  item xs={12} >
       {error.gender && <span>{translate(error.gender)}</span>}<br/>
        <GenderComponent gender={gender} handleRadio = {handleRadio}/>
        </Grid>
        <Grid  item xs={12}>
        {error.birthday && <span>{translate(error.birthday)}</span>}<br/>
        <BirthdayComponent birthDayHandler={handleBirthday}/>
        {error.server && <span>{error.server}</span>}<br/>
        </Grid>
        </Grid>
        <Button variant="contained" color="primary" onClick={handleSubmit} disableElevation>{translate("createAccount")}</Button> 
      </form>
      </div>
      </Container>
  );
};

export default withRouter(SignupWithCredentials);
