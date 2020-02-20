import React from 'react';

const GenderComponent = (props) => {
    return(
        <> 
        <label>Gender</label><br/>
        <input type="radio" name="gender" value="male" onChange={props.handleRadio}/> <label>Male</label><br/>
        <input type="radio" name="gender" value="female" onChange={props.handleRadio}/> <label>Female</label><br/>
        </>);
}
export default GenderComponent;