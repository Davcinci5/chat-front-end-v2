import React, {useState} from 'react';

 
import { FRIEND_REQUEST } from '../schema/mutations'
import ShowImageComponent from './ShowImageComponent'; 
import { useMutation } from '@apollo/react-hooks';



    
const ShowListUserComponent = ({user, reqSent, reqReceived,friendsList}) => {
    
    const findUserInlist = (function({id}){return function(list){return list.some(friend => friend.id === id)}})(user);
    
    function getCuurenSTate(){
        let userInReqRec = findUserInlist(reqReceived); //return true if user exists in request received
        if(userInReqRec){
            return "accept request";
        }else{
            let userInReqSent = findUserInlist(reqSent.val);
            if(userInReqSent){
                return "cancel request";
            }else{
                let userInFriends = findUserInlist(friendsList);
                if(userInFriends){
                    return "delete friend";
                }else{
                    return "send request";
                }
            }
        }    
    }

// hook 
const [stateReq,setStateReq] = useState(getCuurenSTate());
const [request] =  useMutation(FRIEND_REQUEST);




 
   const sendReq = async(e) =>{
       let id = e.target.parentNode.id; 
       try{
        
       let {data} = await request({variables:{friendID:id}});       
            setStateReq(data.friendRequest);
            if(data.friendRequest==="cancelRequest"){
                console.log("entro cancel request");
                reqSent.set([...reqSent.val,user]);
            }
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
                <button onClick={sendReq} >{stateReq}</button>
             </div>

       </>
   );
}

export default ShowListUserComponent;