import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const taskSchema = new mongoose.Schema(
  {
    title: String,
    type: String,
    marks: String,
    start: String,
    due: String,
    questions: [
      {
        head: String,
        body: String,
        images: [String],
        options: [String],
        correctOption: [String],
      },
    ],
    comments: String,
    //   [
    //   {
    //     user_id: String,
    //     name: String,
    //     text: String,
    //   },
    // ],
    subject: String,
    // {
    //   type: mongoose.SchemaTypes.ObjectId,
    //   // required: true,
    // },
    submissions: String,
    // [
    //   {
    //     type: mongoose.SchemaTypes.ObjectId,
    //     //   required: true,
    //   },
    // ],
    user: String,
    // {
    //   type: mongoose.SchemaTypes.ObjectId,
    //   // required: true,
    // },
  },
  { timestamps: true }
);

taskSchema.plugin(mongoosePaginate);

export const Task = mongoose.model('task', taskSchema);
