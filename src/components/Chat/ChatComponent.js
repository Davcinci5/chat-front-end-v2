import React, {useState, useRef, useEffect} from 'react';

import moment from 'moment'

//css
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { Container } from '@material-ui/core';

//my component
import NewMessage from './NewMessage';

//socket production
import socketIOClient from 'socket.io-client';



let socket;


const useStyles = makeStyles(theme => ({
    text: {
      padding: theme.spacing(2, 2, 0),
    },
    paper: {
      paddingBottom: 50,
      height:'60vh'
    },
    list: {
      marginBottom: theme.spacing(2),
      maxHeight:'100%',
      overflow:'auto'
    },
    TextRigh: {
      textAlign:"right"
    }
}))

const ChatComponent = ({email, receiver,friendsList, reqReceived,reqSent,group}) =>{
const classes = useStyles();
    //Hooks
   const [typedMsg,setMessage] = useState("");
   const [display,setDisplay] = useState([]);
   const [update,setUpdate] = useState(false);
   const [updF,setUpdF] = useState(false);
   const [updSent,setUpdSent] = useState(false);

    useEffect(() => {
        //socket production
     socket = socketIOClient({ path: "/socket.io" });
      socket.on('connect',() => {
        console.log('Connected'); 
       });
    
      socket.on('disconnect', () => {
          socket.emit('leave');
            socket.disconnect();
          console.log('Disconnected from server'); 
        });

       socket.on("receiveHistorial",({messages})=>{   
            receiveHistorial(messages);                
        });

    },[]);
//////////////////////////////////
    useEffect(()=>{
        socket.removeAllListeners('receiveNewGroup');
        socket.on("receiveNewGroup",({newGroup})=>{   
            let existGroup = group.val.find(g => g.id === newGroup.id);
            if(!existGroup){
                setUpdate(false);
                group.set(()=>[...group.val,newGroup]);
                socket.emit("joinGroup",{id:newGroup.id});
            }
        });

    },[group.val]);

    useEffect(()=>{
        if(update){
            let last = group.val[group.val.length-1];
            if(last){
                socket.emit("newGroup",{to:last});
            }
        }
        return () =>{
            setUpdate(true);
        }

    },[group.val]);

/////////////////////////////////
    useEffect(()=>{
        socket.removeAllListeners('newFriend');
        socket.on("newFriend",(friend)=>{   
            setUpdF(false);
            friendsList.set(()=>[...friendsList.val,friend]);
        });
    },[friendsList.val]);

    useEffect(()=>{        
        if(updF){
            let last = friendsList.val[friendsList.val.length-1];
                socket.emit("reqAccepted",{to:last});
        }
        return () =>{
            setUpdF(true);
        }

    },[friendsList.val]);
///////////////////////////////////////

useEffect(()=>{
    socket.removeAllListeners('reqReceived');
    socket.on("reqReceived",(friend)=>{   
        setUpdSent(false);
        reqReceived.set(()=>[...reqReceived.val,friend]);
    });
},[reqReceived.val]);

useEffect(()=>{        
    if(updSent){
        let last = reqSent.val[reqSent.val.length-1];
            socket.emit("reqSent",{to:last});
    }
    return () =>{
        setUpdSent(true);
    }

},[reqSent.val]);


    

////////////////////////////////
    useEffect(()=>{
       socket.removeAllListeners('newMessage');
       socket.on('newMessage',(message)=>{
        console.log("new message",message);
        
        // ask it's group
        if(isGroup(message.to)){
            if(receiver.id === message.to){
                setDisplay((display)=>[...display,message]); 
                scrollDown();
            } 
        }else{
            if(receiver.id === message.from || receiver.id === message.to){
                setDisplay(display =>[...display,message]); 
                scrollDown();
            } 
        }
        });
       if(receiver.id){   
            const data = {from:email, to:receiver.id};
            socket.emit('getHistorial',data,(data)=>{console.log(`Error ${data}`)});   
        }
    },[receiver])

   
   const chatDomRef = useRef();
    //verify the message's receiver from 'newMessage method' and evaluate whether is a group or not
   const isGroup = (id)=>{
    let regex = /@\w+\.com/; 
        return !regex.test(id);
   }

//enables scroll down if needed
   const scrollDown = () =>{
        if(chatDomRef.current){
            chatDomRef.current.scrollTop = chatDomRef.current.scrollHeight;
        }
   }
//handler receivehistory

const receiveHistorial = (messages) =>{    
    if(messages.length > 0){
            setDisplay(messages.map(msg=>({
                createdAt:msg.date,
                from:msg.sender,
                text:msg.text
            })));
            scrollDown();
    }else{
        setDisplay([]);
    }
}

// handler message





    const handlerInput = e =>{
        setMessage(e.target.value);      
    }


    
    const handleSubmit = e =>{
        e.preventDefault();
        const message =  {  
            from: email,   
            text: typedMsg,
            to:receiver.id 
        }            
        socket.emit('say',message);
            setMessage("");
    }



    return(
        <Container>
        <Paper square className={classes.paper}>
            <List className={classes.list} ref={chatDomRef}>
                {display.map(msg=>{
                    var formattedTime = moment(msg.createdAt).format('h:mm a');
                if(msg.from === email){
                return(
                    <ListItem button className={classes.TextRigh} key={msg.createdAt}>
                    
                        <ListItemText primary ={msg.text} secondary={`${msg.from} ${formattedTime}`} />
                        <ListItemAvatar>
                            <Avatar alt="Profile Picture"  />
                        </ListItemAvatar>
                    </ListItem>)
                    }else{
                    return(<ListItem button key={msg.createdAt}>
                            <ListItemAvatar>
                                <Avatar alt="Profile Picture"  />
                            </ListItemAvatar>
                            <ListItemText primary ={msg.text} secondary={`${msg.from} ${formattedTime}`} />
                        </ListItem>)
                        }
                })
                }
            </List>
      </Paper>
      <NewMessage value={typedMsg} handleSend={handleSubmit} handleMessage={handlerInput}/>
      </Container>
    );
}



export default ChatComponent;