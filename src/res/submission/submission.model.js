import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const submissionSchema = new mongoose.Schema(
  {
    title: String,
    answers: [String],
    task: String,
    // {
    // type: mongoose.Schema.Types.ObjectId,
    // required: true,
    // ref: 'task',
    // },
    user: String,
    // {
    //   type: mongoose.SchemaTypes.ObjectId,
    // },
    files: [{}],
    course: String,
    subject: String,
    schoolId: {
      type: String,
      // required: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: 'user',
    },
    date: String,
  },
  { timestamps: true }
);

submissionSchema.plugin(mongoosePaginate);

export const Submission = mongoose.model('submission', submissionSchema);
