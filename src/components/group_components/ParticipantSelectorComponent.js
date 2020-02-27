import React from 'react';
import translate from '../../i18n/translate';

const ParticipantSelector = ({id,fullName,handler,title}) =>{
     
    const handlerGroup =()=>{        
        handler(id);
    }

    return(
        <li key={id}>
             {fullName}
             <button onClick={handlerGroup}>
               {translate(title)}
              </button>
        </li>
    );
}
export default ParticipantSelector;