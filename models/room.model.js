const { Schema, model } = require('mongoose');

const roomSchema = new Schema({
  roomName: {
    type: String,
    required: [true, 'Room name is required.'],
  },
  creator: {
    type: Schema.Types.ObjectId, ref: 'User',
  },
  messages: {
    type: [
      { type: Schema.Types.ObjectId, ref: 'Message' },
    ],
    default: [],
  },
  members: {
    type: [
      { type: Schema.Types.ObjectId, ref: 'User' },
    ],
    default: [],
  },
}, { timestamps: { createdAt: 'create_at', updatedAt: 'updated_at' } });

const Room = new model('Room', roomSchema);

module.exports = Room;
