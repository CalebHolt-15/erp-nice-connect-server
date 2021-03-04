import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const submissionSchema = new mongoose.Schema(
  {
    title: String,
    answers: [String],
    title: [String],
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
    subject: String,

    schoolId: { type: String, required: true },
    teacherId: String,
    course: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    date: String,
  },
  { timestamps: true }
);

submissionSchema.plugin(mongoosePaginate);

export const Submission = mongoose.model('submission', submissionSchema);
