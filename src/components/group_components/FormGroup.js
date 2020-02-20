import React,{useState, useEffect} from 'react';
import ParticipantSelector from './ParticipantSelectorComponent';
import { useMutation } from '@apollo/react-hooks';
import { CREATEGROUP_MUTATION } from '../../schema/mutations'


const FormGroup = ({listFriends,groups,setGroups}) =>{
    const [name,setName] = useState("");
    const [participants,setParticipants] =  useState([]);

    //apollo Hooks
    const [createGrop] = useMutation(CREATEGROUP_MUTATION);

   
    const removeParticipant = (idPart) => {
        setParticipants(participants.filter(p=>p !== idPart));
    }

    const addParticipant = (idPart) => {
        let exist = participants.find(p=>p === idPart);
        if(!exist) setParticipants([...participants,idPart])
         
    }

   
    const clearName = () =>{
        setName("");
    }

    const clearListFriends = () =>{
        setParticipants([]);
    }
    const handlerNameGroup =(e)=>{
        const value = e.target.value;
        setName(value);
    }

    const getListFriends = () =>{
        if(!listFriends) return;
        return listFriends.map(friend=>(
            <ParticipantSelector
                key={friend.id} 
                id={friend.id} 
                fullName={friend.fullName} 
               handler={addParticipant}
                title={"add"}
                />
            ))
    }

    const getListParticipants= () =>{
        if(!participants) return;
        return participants.map(p=>{
            let friend = listFriends.find(f=>f.id === p);            
            return <ParticipantSelector
                key={friend.id} 
                id={friend.id} 
                fullName={friend.fullName} 
                handler={removeParticipant}
                title={"remove"}
                />
        })}

    const handlerCreateGroup =() =>{
        if(!name || !participants.length) return
        createGrop({variables:{name,addedFriends:participants}})
        .then(obj=>{
            let Groups = [...groups,obj.data.createGroup];
            setGroups(Groups);
            }
        )  
        clearName();
        clearListFriends();
    }

    return(
        <div>
            Create Group
            <br/>
            <label>
                Name: 
                <input name="group" value={name} type="text" onChange={handlerNameGroup} placeholder="Group Name"/> 
            </label>
            <div>
                Friends:
                <ul>
                {getListFriends()}
                </ul>
            </div>
            <div>
                Participants:
                <ul>
                {getListParticipants()}
                </ul>
            </div>
            <button onClick={handlerCreateGroup}>Create Group</button>
        </div>
    );
};



export default FormGroup;