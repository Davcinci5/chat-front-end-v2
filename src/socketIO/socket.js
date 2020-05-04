import io from 'socket.io-client'

const startSocket = () =>{
    const socket = io.connect('/');
    return socket;
} 


export default startSocket;
