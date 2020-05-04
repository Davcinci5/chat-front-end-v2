import React from 'react';
import { FRIEND_REQUEST } from '../schema/mutations'
import { useMutation } from '@apollo/react-hooks';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    paper: {
      width:'100%',
      height:'40vh'
    },
    list: {
   
      maxHeight:'100%',
      overflow:'auto'
    },
}
))

const FriendRequests = ({reqReceived, setReqReceived, friendsList, setFriendList}) =>{
    
    const [acceptReq] =  useMutation(FRIEND_REQUEST);
     //css classes
     const classes = useStyles();

     const sendReq = async(e,user) =>{
        let id = e.target.parentNode.id; 
        try{
         
        await acceptReq({variables:{friendID:id}});
        setReqReceived(reqReceived.filter(req => req.id !== id));
        setFriendList([...friendsList, user]);
        }catch(e){
             console.log(e);
        }
    }

    return(<>
    <Paper className={classes.paper}>
    <List className={classes.list}>
        {reqReceived && reqReceived.map(user => (
            <div key={user.id} id={user.id}>
            <p>{user.fullName}</p>
            <p>{user.email}</p>
            <button onClick={(e)=> sendReq(e,user)} >accept request</button>
         </div>
        ))}
    </List> 
    </Paper>  
    </>)
}  
export default FriendRequests;