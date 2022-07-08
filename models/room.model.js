const { Schema, model } = require('mongoose');

const roomSchema = new Schema({
  messages: {
    type: Array,
  },
});

const Room = new model('Room', roomSchema);

module.exports = Room;
