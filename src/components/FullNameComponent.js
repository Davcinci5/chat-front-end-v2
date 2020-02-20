import React from 'react';

const FullNameComponent = (props) =>{
    return(
        <input type="text" name="fullName" placeholder="Fullname" value={props.fullName} onChange={props.handleNameChange}/>
    )
}
export default FullNameComponent;