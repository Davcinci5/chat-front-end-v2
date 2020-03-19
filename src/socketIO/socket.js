function applyMethodSocket(socket){
    socket.on('connect',() => {
        console.log('Connected to server'); 
    });
    
    socket.on('disconnect', () => {
          console.log('Disconnected from server'); 
    });
    
    return socket;
}


export default applyMethodSocket;