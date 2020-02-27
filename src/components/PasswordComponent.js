import React,{ useState } from 'react';
import { useIntl } from 'react-intl';
import translate from '../i18n/translate'

const PasswordComponent = (props) => {
    const [visibility, setVisibility] = useState(false),
          handleOnChange = () =>{
             setVisibility(!visibility);
          }
    return(
    <>
        <input type={visibility ? 'text' : 'password'} placeholder={useIntl().formatMessage({id:"password"})} name="password" value={props.value} onChange={props.handlePassword}/>
        <br/>
        <input type="checkbox" checked={visibility} onChange={handleOnChange} />{translate("showPassword")}
    </>
    )
}

export default PasswordComponent;