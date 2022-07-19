const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId, ref: 'User',
  },
  text: {
    required: [true, 'Text is required.'],
    type: String,
  },
}, { timestamps: { createdAt: 'create_at', updatedAt: 'updated_at' } });

const Message = model('Message', messageSchema);

module.exports = Message;
