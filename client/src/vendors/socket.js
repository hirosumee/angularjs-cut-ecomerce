import io from 'socket.io-client';
const socket = io('http://localhost:4000');

export function checkLoginSocket(fn){
    socket.on('authenticated',(data)=>{
        fn(data);
    })
}
export function loginSocket({email,password},fn){
    socket.emit('login',{email,password},(data)=>{
        if(data.token){
            document.cookie ='jwt='+data.token;
        }
        fn(data);
    });
}

export function sendMessage(content,roomName){
    if(content){
        socket.emit('message',{content,roomName});
    }
}
export function receiveMessage(fn){
    socket.on('message',fn);
}
export function getMessages(roomName,fn){
    
    socket.emit('getMessage',roomName,(data)=>{
        fn(data);
    })
}
export function userOnline(fn){
    socket.on('userOnline',fn);
}

export function connectTo(roomName,roomId,fn){
    socket.emit('chatWith',{roomName,roomId},fn);
}
export function checkUser(fn){
    socket.on('checkUser',fn)
}
export function readMessage(roomId){
    socket.emit('readedMessage',roomId);
}
export function callFriend(roomId){
    socket.emit('call',roomId);
}
export function receiveCall(fn){
    socket.on('receiveCall',fn);
}
export function sendEndCall(data){
    socket.emit('endCall',data);
}
export function receiveEndCall(fn){
    socket.on('endcall',fn);
}
export function requestCreateCall(roomdata,fn){
    socket.emit('createACall',roomdata,fn)
}
export function searchMessages(text,roomId,fn) {
    socket.emit('searchMessage',{text,roomId},fn);
}