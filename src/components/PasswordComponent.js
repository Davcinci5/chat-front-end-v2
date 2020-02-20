import React,{ useState } from 'react';

const PasswordComponent = (props) => {
    const [visibility, setVisibility] = useState(false),
          handleOnChange = () =>{
             setVisibility(!visibility);
          }
    return(
    <>
        <input type={visibility ? 'text' : 'password'} placeholder="Enter password" name="password" value={props.value} onChange={props.handlePassword}/>
        <br/>
        <input type="checkbox" checked={visibility} onChange={handleOnChange} />Show Password
    </>
    )
}

export default PasswordComponent;