import React,{useState} from "react";

import openSocket from 'socket.io-client';


import FormGroup from './FormGroup';
import Chat from '../ChatComponent';
import ListComponent from './ListComponent';



const GroupWrapper = ({listFriends,listGroups,email,fullName}) =>{

const  socket = openSocket('/socket'); 


function startSocket(socket){
    socket.on('connect',() => {
        console.log('Connected to server'); 
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from server'); 
    });
}

    //Hooks
    const [groups,setGroups] = useState(listGroups);
    const [receiver,setReceiver] = useState("");
   


   
    const handleSetReceiver = (e) => {
        e.preventDefault();
        const emailFriend = e.target.id;
        const data = {from:email, to:emailFriend};
        socket.emit('getHistorial',data,(data)=>{console.log(`Error ${data}`)});   
        setReceiver(emailFriend);
    }

    return(<>
            {startSocket(socket)}
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