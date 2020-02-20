import React,{useState} from 'react';

const ParticipantSelector = ({id,fullName,handler,title}) =>{
     
    const handlerGroup =()=>{        
        handler(id);
    }

    return(
        <li key={id}>
             {fullName}
             <button onClick={handlerGroup}>
               {title}
              </button>
        </li>
    );
}
export default ParticipantSelector;