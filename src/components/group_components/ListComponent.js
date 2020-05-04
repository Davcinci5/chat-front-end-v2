import React from 'react';
import translate from '../../i18n/translate';
import { ListItem,Link,ListSubheader } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import GroupIcon from '@material-ui/icons/Group';
import FaceIcon from '@material-ui/icons/Face';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
    cursor: {
        cursor: 'pointer'
    }
}
))
 



const ListComponent = ({handler,groups,friends}) =>{

    const classes = useStyles();
    
    const renderListFriends = (friends) =>(
        friends.map(
            friend=>
                (
            <ListItem >
                <ListItemIcon>
                <FaceIcon />
                </ListItemIcon>
                <Link
                className={classes.cursor}
                    id={friend.email}
                    onClick={handler}
                >{friend.fullName}</Link>
            </ListItem>                
                ))     
    )

    const renderListgroups = (list) =>(
        list.map(element =>(
            <ListItem  >
                <ListItemIcon>
                <GroupIcon />
                </ListItemIcon>
                <Link 
                    className={classes.cursor}
                    id={element.id} 
                    onClick={handler}
                >{element.name}</Link>
            </ListItem>
        )))
       
    
    
    return(<div>
    <ListSubheader inset>{translate("listFriends")}</ListSubheader>
     {renderListFriends(friends)}
     <ListSubheader inset>{translate("listGroup")}</ListSubheader>
     {renderListgroups(groups)}
    </div>)
};
export default ListComponent;