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

//socket 
import openSocket from 'socket.io-client';
import startSocket from '../socketIO/socket';


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
    const [receiver,setReceiver] = useState("");
    //open socket
    const  socket = openSocket('/socket'); 
  
   const classes = useStyles();

   
    const { loading, error, data } = useQuery(CURRENT_USER_QUERY);
    
    useEffect(()=>{
      if(data && data.currentUser){
        setGroups(data.currentUser.groups);
      }
    },[data])
    if (loading) return <div>Loading</div>;
    if (error) return <div>Error: {JSON.stringify(error)}</div>;
    const isLoggedIn = !!data.currentUser;

    if(!isLoggedIn) return <Redirect to='/login' />
    const {
      birthday,
      email,
      friendsList,
      fullName,
      gender,
      profileImg,
      reqReceived,
      reqSent
     } = data.currentUser;

   

  

  

  const handleSetReceiver = (e) => {
    e.preventDefault();
    const emailFriend = e.target.id;
    const data = {from:email, to:emailFriend};
    socket.emit('getHistorial',data,(data)=>{console.log(`Error ${data}`)});   
    setReceiver(emailFriend);
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

    <div className={classes.root} onLoad={startSocket(socket)}>
   
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
            friendsList={friendsList} 
            reqSent={reqSent} 
            reqReceived={reqReceived}
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
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                {translate("chat")}
              </Typography>
                <Chat 
                email={email} 
                fullName={fullName} 
                receiver={receiver}
                socket ={socket}
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