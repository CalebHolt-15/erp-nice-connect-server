import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const taskSchema = new mongoose.Schema(
  {
    user: String,
    title: String,
    description: String,
    type: String,
    marks: String,
    start: String,
    due: String,
    // comments: String,
    //   [
    //   {
    //     user_id: String,
    //     name: String,
    //     text: String,
    //   },
    // ],
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
    studentName: String,
    // {
    //   type: mongoose.SchemaTypes.ObjectId,
    //   // required: true,
    // },

    // school: String,
    course: String,
    subject: String,
    questions: [
      {
        head: String,
        body: String,
        images: [String],
        options: [String],
        correctOption: [String],
      },
    ],
    files: [{}],
    schoolId: { type: String, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
  },

  { timestamps: true }
);

taskSchema.plugin(mongoosePaginate);

export const Task = mongoose.model('task', taskSchema);
