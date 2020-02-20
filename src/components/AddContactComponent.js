import React, {useState} from 'react';
import ShowListUser from '../components/ShowListUserComponent';
import { useMutation } from '@apollo/react-hooks';
import { SEARCH_USER } from '../schema/mutations';

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
            throw new Error(e);
        }
        
    }

    const fillQueryUsr = ({target:{value}}) =>{ 
       setChain(value);
    }
  
    return(
        <div>
            <input placeholder="by name or email" onChange={fillQueryUsr}/>
            <button onClick={searchUser} >Search</button> <br/>
            {usersFound && usersFound.map(user => (
                <ShowListUser key={user.id} user={user} reqSent={sent} reqReceived={received} friendsList={friends}/>
            ))}
        
        </div>
    );
}; 

export default AddContact;