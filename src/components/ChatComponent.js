import React, {useState} from 'react';
import translate from '../i18n/translate';
import { useIntl } from 'react-intl';

const ChatComponent = ({email, fullName, receiver,socket}) =>{ 

    //Hooks
   const [typedMsg,setMessage] = useState("");
   const [display,setDisplay] = useState([]);
   const isParticipant = (function(from,to){
       console.log("receiver",to);
       
       return function(participant){
            if(participant===to || participant ===from)return true;
            return false;
       }
   })(email,receiver);

 
    
    socket.on('newMessage',(message)=>{
        let current = isParticipant(message.from);
        console.log(current);
        
        if(current) setDisplay([...display,message]); 
    });

    socket.on("receiveHistorial",({messages})=>{
        setDisplay(messages.map(msg=>({
            createdAt:msg.createdAt,
            from:msg.sender,
            text:msg.text
        })));
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
        socket.emit('say',message);
         setMessage("");
    }
    



    const showConversation = messages =>{
        return messages.map(msg=>(
            <li key={msg.createdAt}>{`${msg.from} : ${msg.text}`}</li>
            ))
    }

    return(
        <>
        <div>{translate("chat")} </div>
        <ol>{showConversation(display)}</ol>

        <form id="message-form" onSubmit={handleSubmit}>  
            <input name="message" value={typedMsg} type="text" onChange={handlerInput} placeholder={useIntl().formatMessage({id:"message"})}/>  
    <button>{translate("send")}</button> 
        </form> 
        </>
    );
}

export default ChatComponent;