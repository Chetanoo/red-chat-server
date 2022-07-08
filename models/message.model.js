const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
  text: {
    type: String,
  },
}, { timestamps: { createdAt: 'create_at', updatedAt: 'updated_at' } });

const Message = model('Message', messageSchema);

module.exports = Message;
