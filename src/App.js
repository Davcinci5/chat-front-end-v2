import React from 'react';
import { useQuery } from '@apollo/react-hooks';

//import LoginWithFacebook from './components/LoginWithFacebook';
import SignupWithCredentials from './components/SignupWithCredentials';
import SignInCredentials from './components/SignInCredentials';
import LogoutButton from './components/LogoutButton'; 
import MEComponent from './components/MEComponent';
import AddContactComponent from './components/AddContactComponent'
import GroupWrapper from './components/group_components/GroupWrapperComponent';

import { CURRENT_USER_QUERY } from './schema/queries';

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
      <>
      <MEComponent fullName={fullName} birthday={birthday} gender={gender} email={email} src={profileImg}/>
      <LogoutButton/>
      <AddContactComponent sent={reqSent} received={reqReceived} friends={friendsList}/>
      <GroupWrapper listFriends={friendsList} listGroups={groups} email={email} fullName={fullName}/>            
      </>
    );
  }

  // SIGNUP AND LOGIN GO HERE
  return (
    <>
      <SignInCredentials />
      <SignupWithCredentials />
    </>
  );
};

export default App;