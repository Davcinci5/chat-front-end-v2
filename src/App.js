import React,{useState} from 'react';
// import { useQuery } from '@apollo/react-hooks';

//React Router
import {BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';


//internationalization 
import {I18nProvider, LOCALES} from './i18n';


 

//css 
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const Internationalization = props =>{
    const [local,setLocal] = useState(LOCALES.ENGLISH);
    const classes = useStyles();
    return(
    <I18nProvider locale={local}>
      {props.children}
      <div className={classes.root}>
      <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
        <Button onClick={()=>setLocal(LOCALES.ENGLISH)}>ENGLISH</Button>
        <Button onClick={()=>setLocal(LOCALES.GERMAN)}>SPANISH</Button>
        <Button onClick={()=>setLocal(LOCALES.JAPANESE)}>JAPANESE</Button>
      </ButtonGroup>
      </div>
    </I18nProvider>
    )
  }

const App = () => {      
    return (
      <Router>
        <Internationalization >
          <Routes/>
        </Internationalization>
      </Router>
    );
};

export default App;