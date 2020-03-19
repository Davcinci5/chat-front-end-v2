import React from 'react';
import translate from '../../i18n/translate';
import { makeStyles } from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    list:{
        padding:'0 20px',
        marginTop:'-10px'
    }
}))

const ParticipantSelector = ({id,fullName,handler,title}) =>{
     
    const classes = useStyles();

    const handlerGroup =()=>{        
        handler(id);
    }

    return(
        <ListItem className={classes.list} key={id}>
            <ListItemText primary={fullName}/> 
             <Button 
             color="secondary"
             onClick={handlerGroup}
             >
               {translate(title)}
              </Button>
        </ListItem>
    );
}
export default ParticipantSelector;