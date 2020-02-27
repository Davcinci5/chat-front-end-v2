import React,{useState} from 'react';
import { useQuery } from '@apollo/react-hooks';

//import LoginWithFacebook from './components/LoginWithFacebook';
import SignupWithCredentials from './components/SignupWithCredentials';
import SignInCredentials from './components/SignInCredentials';
import LogoutButton from './components/LogoutButton'; 
import MEComponent from './components/MEComponent';
import AddContactComponent from './components/AddContactComponent'
import GroupWrapper from './components/group_components/GroupWrapperComponent';

//internationalization 
import {I18nProvider, LOCALES} from './i18n';
import { CURRENT_USER_QUERY } from './schema/queries';


const Internationalization = props =>{
    const [local,setLocal] = useState(LOCALES.ENGLISH);
    return(
    <I18nProvider locale={local}>
      {props.children}
      <button onClick={()=>setLocal(LOCALES.ENGLISH)}>ENGLISH</button>
      <button onClick={()=>setLocal(LOCALES.GERMAN)}>GERMAN</button>
      <button onClick={()=>setLocal(LOCALES.JAPANESE)}>JAPANESE</button>
    </I18nProvider>
    )
  }

const App = () => {
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY);

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error: {JSON.stringify(error)}</div>;

  const isLoggedIn = !!data.currentUser; 

  if (isLoggedIn) {
    const {
      id,
      fullName,
      email,
      gender,
      birthday,
      profileImg,
      friendsList,
      reqSent, 
      reqReceived,
      groups
    } = data.currentUser;
     
    return (
      <Internationalization >
        <MEComponent fullName={fullName} birthday={birthday} gender={gender} email={email} src={profileImg}/>
        <LogoutButton/>
        <AddContactComponent sent={reqSent} received={reqReceived} friends={friendsList}/>
        <GroupWrapper listFriends={friendsList} listGroups={groups} email={email} fullName={fullName}/>            
      </Internationalization>
    );
  }

  // SIGNUP AND LOGIN GO HERE
  return (
    <Internationalization>
      <SignInCredentials />
      <SignupWithCredentials />
    </Internationalization>
  );
};

export default App;