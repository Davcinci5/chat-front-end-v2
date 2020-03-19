import React,{useState} from 'react';
import ParticipantSelector from './ParticipantSelectorComponent';
import { useMutation } from '@apollo/react-hooks';
import { CREATEGROUP_MUTATION } from '../../schema/mutations';

import translate from '../../i18n/translate';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles(theme => ({
    paper: {
      width:'210px',
      height:'20vh'
    },
    list: {
   
      maxHeight:'100%',
      overflow:'auto'
    },
}
))



const FormGroup = ({listFriends,groups,setGroups}) =>{

    const [name,setName] = useState("");
    const [participants,setParticipants] =  useState([]);
    //css classes
    const classes = useStyles();

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
        <Container>
            {translate("createGroup")}
            <br/>
            <FormControl >
            <InputLabel >{translate("name")}</InputLabel>
            <Input 
                id="standard-adornment-group"
                type="text"
                name="group" 
                value={name} 
                onChange={handlerNameGroup}
              />
             </FormControl>  
             <br/>
            <FormControl>
                {translate("listFriends")}:
                <Paper  className={classes.paper}>
                    <List className={classes.list}>
                    {getListFriends()}
                    </List>
                </Paper>
            </FormControl>
            <br/>
            <FormControl>
                {translate("members")}:
                <Paper className={classes.paper}>
                    <List className={classes.list}>
                    {getListParticipants()}
                    </List>
                </Paper>
            </FormControl>
            <br/>
            <Button  color="primary" onClick={handlerCreateGroup}>{translate("createGroup")}</Button>
           
        </Container>
    );
};



export default FormGroup;