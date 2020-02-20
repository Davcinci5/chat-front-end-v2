import React, {useState} from 'react';
import { suscribeToTimer } from './../socketIO/socket'

const TetsTimer = () =>{
    //Hooks
    const [timestamp,setTimestamp] = useState('');
    suscribeToTimer((err,timestamp) => setTimestamp(timestamp));
    return(
    <div>This is timer value: {timestamp}</div>
    );
}

export default TetsTimer; 