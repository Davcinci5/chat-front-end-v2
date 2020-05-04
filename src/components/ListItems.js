import React from 'react';
//time library
import moment from 'moment';
//internazinalitation library 
import translate from '../i18n/translate';
//css
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import PersonIcon from '@material-ui/icons/Person';
import CakeTwoToneIcon from '@material-ui/icons/CakeTwoTone';
import WcIcon from '@material-ui/icons/Wc';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Link } from '@material-ui/core';

//my component 
import AddContactComponent from './AddContactComponent';
import FormGroup from './group_components/FormGroup';
import FriendRequest from './FriendRequest'

export const MainListItems = ({fullName, birthday, gender,email}) => {

  const createDateWithCurrentYear = (date) => {
    if (!date) return moment(moment().format("YYYY MM DD"));
    let currentYear = moment().format("YYYY");
    let actualDate = moment(date,"YYYY MM DD").format("MM DD");
    return moment(`${currentYear} ${actualDate}`)
}
  
  const getDaysBirthday = (birthday)=>{
    birthday = createDateWithCurrentYear(birthday)
    let dateNow = createDateWithCurrentYear();
    let remainDays = birthday.diff(dateNow,'days');
    if(remainDays < 0){
         remainDays = birthday.add(1,"year").diff(dateNow,'days');
    }
    return remainDays 
}

let daysForBirthday = getDaysBirthday(birthday);

return(
  <div>
    <ListSubheader inset>{translate("profile")}</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary={fullName} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <CakeTwoToneIcon />
      </ListItemIcon>
      <ListItemText primary={daysForBirthday === 0? translate("happyBirthday"): translate("daysbirthday",{days:daysForBirthday})}/>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <WcIcon/>
      </ListItemIcon>
      <ListItemText primary= {translate(gender)}/>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AlternateEmailIcon />
      </ListItemIcon>
      <ListItemText primary={email} />
    </ListItem>
  </div>
)
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: 'white',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    margin:theme.spacing(3),
    height: '400',
  },
})); 

export const SecondaryListItems = (props) =>{
  const [addFriends, setModalFriendOpen] = React.useState(false);
  const [createGroup,setModalGroup] = React.useState(false);
  const [requestF,setRequestF] = React.useState(false);

  const handleModalFriendOpen = (e) => {
    e.preventDefault();
    setModalFriendOpen(true);
  };

  const handleModalFriendClose = () => {
    setModalFriendOpen(false);
  };

  const handleModalGroupOpen = (e) => {
    e.preventDefault();
    setModalGroup(true);
  };

  const handleModalGroupClose = () => {
    setModalGroup(false);
  };

  const handleModalReqOpen = (e) => {
    e.preventDefault();
    setRequestF(true);
  };

  const handleModalReqClose = () => {
    setRequestF(false);
  };
  


  const classes = useStyles();

  const modalStyle = {
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }
  return (<>
    <ListSubheader inset>{translate("setting")}</ListSubheader>
    <ListItem button >
      <ListItemIcon>
          <PersonAddIcon />
        </ListItemIcon>
        
    <div>
      <Link href="/" onClick={handleModalFriendOpen}>
      <ListItemText primary={translate("addFriend")} />
      </Link> 
        <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={addFriends}
   
          > 
            <div style={modalStyle} className={classes.paper} >
  
            <AddContactComponent  sent={props.reqSent} received={props.reqReceived.val} friends={props.friendsList.val}/>
          
            <Button variant="contained" color="primary" onClick={handleModalFriendClose}>{translate("close")}</Button>
            </div>
          </Modal>
            </div>
        </ListItem>
        <ListItem>
          <ListItemIcon>
              <GroupAddIcon />
            </ListItemIcon>
            <div>
            <Link href="/" onClick={handleModalGroupOpen}>
              <ListItemText primary={translate("createGroup")} />
            </Link>
                <Modal
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  open={createGroup}
                > 
                  <div style={modalStyle} className={classes.paper}>
                  <FormGroup 
                      listFriends={props.friendsList.val} 
                      groups={props.groups} 
                      setGroups={props.setGroups} 
                  />
                    <Button variant="contained" color="primary" onClick={handleModalGroupClose}>{translate("close")}</Button>
                  </div>
                </Modal>
          </div>
    </ListItem>
    <ListItem>
        <ListItemIcon>
          <PersonAddIcon/>
        </ListItemIcon>
        <div>
          <Link href="/" onClick={handleModalReqOpen}>
            <ListItemText primary={translate("friendReq")} secondary={props.reqReceived.val.length}/>
          </Link> 
          <Modal
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  open={requestF}
                >
              <div style={modalStyle} className={classes.paper}>
              <FriendRequest reqReceived={props.reqReceived.val} setReqReceived={props.reqReceived.set} friendsList={props.friendsList.val} setFriendList={props.friendsList.set}/>
              <Button variant="contained" color="primary" onClick={handleModalReqClose}>Close</Button>
              </div> 
          </Modal>
        </div>
    </ListItem>
  </>);
}


