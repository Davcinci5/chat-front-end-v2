import React from 'react';

const EmailComponent = (props) =>{
    return(
        <input type="email" name="email" placeholder="Enter email" value={props.email} onChange={props.handleEmailChange}/>
    )
}
export default EmailComponent;