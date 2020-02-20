import React,{useState} from "react";

import openSocket from 'socket.io-client';


import FormGroup from './FormGroup';
import Chat from '../ChatComponent';
import ListComponent from './ListComponent';

const GroupWrapper = ({listFriends,listGroups,email,fullName}) =>{
    //Hooks
    const [groups,setGroups] = useState(listGroups);
    const [receiver,setReceiver] = useState("");
   
    const  socket = openSocket('/'); 
    
    socket.on('connect',() => {
        console.log('Connected to server'); 
    });
    
    socket.on('disconnect', () => {
          console.log('Disconnected from server'); 
    });

   
    const handleSetReceiver = (e) => {
        e.preventDefault();
        const emailFriend = e.target.id;
        const data = {from:email, to:emailFriend};
        socket.emit('getHistorial',data,(data)=>{console.log(`Error ${data}`)});   
        setReceiver(emailFriend);
    }

    return(<>
            <ListComponent
                handler={handleSetReceiver}
                groups={groups} 
                friends={listFriends} 
            />
           <Chat email={email} 
                 fullName={fullName} 
                 receiver={receiver}
                 socket ={socket}
            />

            <FormGroup 
                listFriends={listFriends} 
                groups={groups} 
                setGroups={setGroups} 
            />
    </>);
};

export default GroupWrapper;