import React,{ useState } from 'react';
import translate from '../../i18n/translate'

//css
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

//css obj
const useStyles = makeStyles(theme => ({
    margin: {
      margin: theme.spacing(1),
    },
    textField: {
      width: 200,
    },
  }));

const PasswordComponent = (props) => {
    //css
    const classes = useStyles();

    const [visibility, setVisibility] = useState(false),
          handleOnChange = () =>{
             setVisibility(!visibility); 
          }
    return(
    <>
    <FormControl className={clsx(classes.margin, classes.textField)}>
        <InputLabel >{translate("password")}</InputLabel>
        <Input 
            id="standard-adornment-password"
            type={visibility ? 'text' : 'password'} 
            name="password" 
            value={props.password} 
            onChange={props.handlePassword}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleOnChange}
                >
                  {visibility ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            />
    </FormControl>
    </>
    )
}

export default PasswordComponent;