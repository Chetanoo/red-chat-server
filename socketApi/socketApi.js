const io = require('socket.io')({
  cors: {
    origin: 'http://localhost:3001',
  },
});
const socketioJwt = require('socketio-jwt');
const socketHelpers = require('./helpers');

io.on('connection', (socket) => {
  console.log('connected');
  socketHelpers.initialRooms(socket);
  socket.on('requestRooms', () => socketHelpers.initialRooms(socket));
  socket.on('createRoom', ({ roomName, userId }) => socketHelpers.createRoom(socket, roomName, userId));
  socket.on('joinRoom', ({ roomId, userId }, callback) => socketHelpers.joinRoom(socket, roomId, userId, callback));
  socket.on('sendMessage', ({ text, userId, roomId }, callback) => socketHelpers.sendMessage(socket, text, roomId, userId, callback));
  socket.on('deleteRoom', () => console.log('delete group'));
  socket.on('createMessage', () => console.log('create message'));
  socket.on('disconnect', () => console.log('disconnected'));
});

module.exports = io;
