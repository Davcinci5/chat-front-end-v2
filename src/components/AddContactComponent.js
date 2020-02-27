import React, {useState} from 'react';
import ShowListUser from '../components/ShowListUserComponent';
import { useMutation } from '@apollo/react-hooks';
import { SEARCH_USER } from '../schema/mutations';

import translate from '../i18n/translate';
import { useIntl } from 'react-intl';

const AddContact = ({sent,received,friends}) => {
   //apollo-hooks
   const [search] = useMutation(SEARCH_USER);
   
    //Hook
   const [chain,setChain] = useState("");
   const [usersFound,setUsersFound] = useState([]);


    
    const searchUser = async() =>{
        try{       
        let data = await search({variables:{chain}});  
        setUsersFound(data.data.searchUsers);
        }catch(e){
            throw new Error(e );
        }
        
    }

    const fillQueryUsr = ({target:{value}}) =>{ 
       setChain(value);
    }
  
    return(
        <div>
            <input placeholder={useIntl().formatMessage({id:"nameOremail"})} onChange={fillQueryUsr}/>
    <button onClick={searchUser} >{translate("search")}</button> <br/>
            {usersFound && usersFound.map(user => (
                <ShowListUser key={user.id} user={user} reqSent={sent} reqReceived={received} friendsList={friends} />
            ))}
        
        </div>
    );
}; 

export default AddContact;