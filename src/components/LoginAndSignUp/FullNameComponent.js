import React from 'react';
import translate from '../../i18n/translate'

//css 
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';

//css styles
const useStyles = makeStyles(theme => ({
    margin: {
      margin: theme.spacing(1),
    },
    textField: {
      width: 150,
    },
  }));

// import { useIntl } from 'react-intl';

const FullNameComponent = (props) =>{
    const classes = useStyles();
return(
    <FormControl  className={clsx(classes.margin, classes.textField)}>
        <InputLabel >{translate("fullName")}</InputLabel>
        <Input 
            id="standard-adornment-name"
            type="text"
            name="fullName" 
            value={props.fullName} 
            onChange={props.handleNameChange}
        />
    </FormControl> )
}
export default FullNameComponent;