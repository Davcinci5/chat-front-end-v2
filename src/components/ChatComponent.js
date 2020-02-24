import React, {useState} from 'react';
// import openSocket from 'socket.io-client';
// const  socket = openSocket('/'); 

const ChatComponent = ({email, fullName, receiver,socket}) =>{ 

    //Hooks
   const [typedMsg,setMessage] = useState("");
   const [display,setDisplay] = useState([]);
    
    socket.on('newMessage',(message)=>{
        setDisplay([...display,message]); 
    });

    socket.on("receiveHistorial",({messages})=>{
console.log("entro receive historial");

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
            from: fullName,   
            text: typedMsg,
            to:receiver 
        }
        socket.emit('say',message);
        console.log("then i see",message);
        
         setMessage("");
    }
    



    const showConversation = messages =>{
        return messages.map(msg=>(
            <li key={msg.createdAt}>{`${msg.from} : ${msg.text}`}</li>
            ))
    }

    return(
        <>
        <div>Chat Component </div>
        <ol>{showConversation(display)}</ol>

        <form id="message-form" onSubmit={handleSubmit}>  
            <input name="message" value={typedMsg} type="text" onChange={handlerInput} placeholder="Message"/>  
            <button>Send</button> 
        </form> 
        </>
    );
}

export default ChatComponent;