import React, {useState} from 'react';

import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';


import ShowListUser from '../components/ShowListUserComponent';
import { useMutation } from '@apollo/react-hooks';
import { SEARCH_USER } from '../schema/mutations';

import translate from '../i18n/translate';
import { useIntl } from 'react-intl';

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

const AddContact = ({sent,received,friends}) => {
  
   //apollo-hooks
   const [search] = useMutation(SEARCH_USER);
   
    //Hook
   const [chain,setChain] = useState("");
   const [usersFound,setUsersFound] = useState([]);

      //css classes
      const classes = useStyles();


    
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
        <div >
            <input placeholder={useIntl().formatMessage({id:"nameOremail"})} onChange={fillQueryUsr}/>
            <button onClick={searchUser} >{translate("search")}</button> <br/>
            <Paper className={classes.paper}>
            <List className={classes.list}>
                {usersFound && usersFound.map(user => (
                    <ShowListUser  key={user.id} user={user} reqSent={sent} reqReceived={received} friendsList={friends} />
                ))}
            </List> 
            </Paper>      
        </div>
    );
}; 

export default AddContact;