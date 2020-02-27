import React from 'react';
import translate from '../i18n/translate';
const GenderComponent = (props) => {
    return(
        <> 
        <label>{translate("gender")}</label><br/>
        <input type="radio" name="gender" value="male" onChange={props.handleRadio}/> <label>{translate("male")}</label><br/>
        <input type="radio" name="gender" value="female" onChange={props.handleRadio}/> <label>{translate("female")}</label><br/>
        </>);
}
export default GenderComponent;