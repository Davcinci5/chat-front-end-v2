import React, {useState, useRef} from 'react';

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

const ChatComponent = ({email, receiver,socket}) =>{
const classes = useStyles();
    //Hooks
   const [typedMsg,setMessage] = useState("");
   const [display,setDisplay] = useState([]);
   const isParticipant = (function(from,to){
       return function(participant){
            if(participant===to || participant ===from)return true;
            return false;
       }
   })(email,receiver);

   const chatDomRef = useRef();

   socket.on('newMessage',(message)=>{
     let current = isParticipant(message.from);
        if(current){ 
            setDisplay([...display,message]); 
            if(chatDomRef.current){
                chatDomRef.current.scrollTop = chatDomRef.current.scrollHeight;
            }
        }
    });

    socket.on("receiveHistorial",({messages})=>{    
        setDisplay(messages.map(msg=>({
            createdAt:msg.date,
            from:msg.sender,
            text:msg.text
        })));
        if(chatDomRef.current){
            chatDomRef.current.scrollTop = chatDomRef.current.scrollHeight;
        }
    })

        const handlerInput = e =>{
            setMessage(e.target.value);      
        }
    
    
        
        const handleSubmit = e =>{
            e.preventDefault();
            const message =  {  
                from: email,   
                text: typedMsg,
                to:receiver 
            }
            console.log("message : ", message);
            
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