import React, {useState,useEffect} from 'react';

 
import { FRIEND_REQUEST } from '../schema/mutations'
import ShowImageComponent from './ShowImageComponent'; 
import { useMutation } from '@apollo/react-hooks';
 

const ShowListUserComponent = ({user, reqSent, reqReceived,friendsList}) => {
// hook 
const [stateReq,setStateReq] = useState("");
const [request] =  useMutation(FRIEND_REQUEST);

useEffect(()=>{
    if(reqReceived.find(friend => friend.id === user.id) !== undefined){
        setStateReq("Accept Request");
    }else if(reqSent.find(friend => friend.id === user.id) !== undefined){
        setStateReq("Cancel Request");
    }else if(friendsList.find(friend => friend.id === user.id)!== undefined){
        setStateReq("Delete Friend");
    }
    else{
        setStateReq("Send Request");
    }
},[reqSent,reqReceived]);
 
   const testF = async(e) =>{
       let id = e.target.parentNode.id; 
       try{
       let {data} = await request({variables:{friendID:id}});
            setStateReq(data.friendRequest);
       }catch(e){
            console.log(e);
       }
   }

   return(
       <>
             <div key={user.id} id={user.id}>
                <p>{user.fullName}</p>
                <p>{user.email}</p>
                <ShowImageComponent src={user.profileImg} height="50" width="50"/><br/>
                <button onClick={testF}>{stateReq}</button>
             </div>

       </>
   );
}

export default ShowListUserComponent;