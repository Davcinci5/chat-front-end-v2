import React from 'react';
import translate from '../../i18n/translate';
//css

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';



const GenderComponent = (props) => {
 

       return( <FormControl component="fieldset">
        <FormLabel component="legend">{translate("gender")}</FormLabel>
        <RadioGroup row aria-label="gender" name="gender" value={props.gender} onChange={props.handleRadio}>
            <FormControlLabel labelPlacement="start" value="female" control={<Radio />} label={translate("female")} />
            <FormControlLabel labelPlacement="start" value="male" control={<Radio />} label={translate("male")} />
        </RadioGroup>
        </FormControl>)
}
export default GenderComponent;