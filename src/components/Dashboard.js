import React,{useState, useEffect} from 'react';
//react router
import { withRouter,Redirect } from 'react-router-dom';
import clsx from 'clsx';
import translate from '../i18n/translate'; 

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { MainListItems , SecondaryListItems } from './ListItems';//

//fetch user
import { useQuery } from '@apollo/react-hooks';
import { CURRENT_USER_QUERY } from '../schema/queries';


//my components
import ImageLoaderComponent  from './ImageLoaderComponent'
  //friends and groups lists
import ListComponent from './group_components/ListComponent'
import Chat from './Chat/ChatComponent';


const drawerWidth = 240;


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 350,
  },
}));


const Dashboard = (props) => {


    //hooks
    const [open, setOpen] = useState(true);
    const [allGroups,setGroups] = useState([]);
    const [receiver,setReceiver] = useState({});
    const [reqReceived,setReqReceived] = React.useState([]);
    const [friendsList,setFriendsList] = React.useState([]);
    const [reqSents,setReqSent] = React.useState([]);
    
  
   const classes = useStyles();

   
    const { loading, error, data } = useQuery(CURRENT_USER_QUERY);
    
    useEffect(()=>{
      if(data && data.currentUser){
        setGroups(data.currentUser.groups);
        setReqReceived(data.currentUser.reqReceived);
        setFriendsList(data.currentUser.friendsList);
        setReqSent(data.currentUser.reqSent);
      }
    },[data])



    if (loading) return <div>Loading</div>;
    if (error) return <div>Error: {JSON.stringify(error)}</div>;
    const isLoggedIn = !!data.currentUser;

    if(!isLoggedIn) return <Redirect to='/login' />
    const {
      birthday,
      email,
      fullName,
      gender,
      profileImg,
     } = data.currentUser;

const lookForMembers = (id) =>{
      const isDGroup = g => g.id === id;
      const onlyNamesPart = (ac,cv) =>`${ac} ${cv.fullName}`;
      const participantObj = allGroups.find(isDGroup);
      if(!participantObj) return;
      return participantObj.participants.reduce(onlyNamesPart,"participants: ");
      
}
const handleSetReceiver = (e) => {
    e.preventDefault();  
    const id = e.target.id;
    const members = lookForMembers(id);
    const name = e.target.innerText;

    const currentTalk = {id,name }
    if(members) currentTalk.members = members;
    if(id !== receiver.id){
      setReceiver(currentTalk);
    } 
    
}

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <>
    <div className={classes.root} >
   
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            {translate("dashboard")}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List >
          <MainListItems fullName={fullName} birthday={birthday} gender={gender} email={email}/>
        </List>
        <Divider />
        <List>
        <ListComponent
                handler={handleSetReceiver}
                groups={allGroups} 
                friends={friendsList} 
            />
        </List>
        <Divider />
        <List>
        <SecondaryListItems 
            friendsList={{"val":friendsList, "set":setFriendsList}} 
            reqSent={{"val":reqSents, "set":setReqSent}} 
            reqReceived={{"val":reqReceived,"set":setReqReceived}}
            groups={allGroups} 
            setGroups={setGroups}
            />
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Typography component="h2" variant="h4" color="primary" gutterBottom>
                {receiver.name ? receiver.name : translate("chat")}
                {receiver.members && <Typography variant="subtitle1" color="primary" gutterBottom>
                                      {receiver.members}
                                   </Typography>}
              </Typography>
              
                <Chat 
                  email={email} 
                  receiver={receiver}
                  friendsList={{"val":friendsList, "set":setFriendsList}}
                  reqReceived={{"val":reqReceived,"set":setReqReceived}}
                  reqSent={{"val":reqSents, "set":setReqSent}} 
                  group={{"val":allGroups,"set":setGroups}}
                />
        
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
              <ImageLoaderComponent src={profileImg} /> 
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
    </>
  );
}

export default withRouter(Dashboard);