import React from 'react';

import translate from '../../i18n/translate'
//css import
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';

//csssty
const useStyles = makeStyles(theme => ({
    margin: {
      margin: theme.spacing(1),
    },
    textField: {
      width: 150,
    }, 
  }));

const EmailComponent = (props) =>{
       //css
       const classes = useStyles();

    return(
        <FormControl className={clsx(classes.margin, classes.textField)}>
            <InputLabel >{translate("email")}</InputLabel>
            <Input 
                id="standard-adornment-email"
                type="email"
                name="email" 
                value={props.email} 
                onChange={props.handleEmailChange}
            />
        </FormControl>  
    )
}
export default EmailComponent; 