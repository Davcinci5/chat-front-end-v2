function applyMethodSocket(socket){
    socket.on('connect',() => {
        console.log('Connected to server'); 
    });
    
    socket.on('disconnect', () => {
          console.log('Disconnected from server'); 
    });
    
    // socket.on('newMessage',(message)=>{
    //     console.log('got new message',message);
    // });
    
    // socket.emit('createMessage', {  from: 'Andrew',  text: 'Yup, that works for me.' });
    //socket.emit('createMessage', {from: 'Andrew', text: 'Enjoy Yourself!'}, function () {  console.log('Got it'); }); 
    
    return socket;
}


export default applyMethodSocket;