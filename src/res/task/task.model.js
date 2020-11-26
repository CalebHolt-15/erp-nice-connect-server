import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  type: String,
  title: String,
  marks: String,
  start: String,
  due: String,
  questions: [
    {
      head: String,
      body: String,
      images: [String],
      options: [String],
      correctOption: String,
    },
  ],
  comments: [
    {
      user_id: String,
      name: String,
      text: String,
    },
  ],
  subject: {
    type: mongoose.SchemaTypes.ObjectId,
    // required: true,
  },
  submissions: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      //   required: true,
    },
  ],
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    // required: true,
  },
});

export const Task = mongoose.model('task', taskSchema);
