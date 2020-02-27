import React from 'react';
import { useIntl } from 'react-intl';

const FullNameComponent = (props) =>{
    return(
        <input type="text" name="fullName" placeholder={useIntl().formatMessage({id:"fullName"})} value={props.fullName} onChange={props.handleNameChange}/>
    )
}
export default FullNameComponent;