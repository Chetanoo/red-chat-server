const Room = require('../models/room.model');
const User = require('../models/user.model');
const Message = require('../models/message.model');

const socketHelpers = {};

socketHelpers.createRoom = (socket, roomName, userId) => {
  const room = new Room({ roomName, creator: userId, members: [userId] });
  room.save();
  socket.emit('roomCreated', room);
};

socketHelpers.joinRoom = async (socket, roomId, userId, callback) => {
  await Room.findOne({ _id: roomId })
    .populate('members', '_id username email')
    .populate({
      path: 'messages',
      select: 'text created_at updated_at author',
      populate: { path: 'author', select: '_id username email' },
    })
    .populate('creator', '_id username email')
    .exec(async (error, room) => {
      if (!room.members.find((member) => member.id === userId)) {
        socket.join(roomId);
        await room.updateOne({ $push: { members: userId } });
      }
      callback(room);
    });
};

socketHelpers.initialRooms = async (socket) => {
  await Room.find()
    .populate('creator', '_id username email')
    .select('roomName _id')
    .exec((error, initialRooms) => {
      socket.emit('initialRooms', initialRooms);
    });
};

socketHelpers.sendMessage = async (socket, text, roomId, userId, callback) => {
  await Room.findOne({ _id: roomId })
    .exec(async (error, room) => {
      const message = new Message({ text, author: userId });
      await message.save();
      await message.populate('author', '_id username email');
      await room.updateOne({ $push: { messages: message._id } });
      socket.emit('messageSent', message);
      callback();
    });
};

module.exports = socketHelpers;
