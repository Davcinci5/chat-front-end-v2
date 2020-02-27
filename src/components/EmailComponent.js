import React from 'react';
import { useIntl } from 'react-intl';

const EmailComponent = (props) =>{
    return(
        <input type="email" name="email" placeholder={useIntl().formatMessage({id:"email"})} value={props.email} onChange={props.handleEmailChange}/>
    )
}
export default EmailComponent; 