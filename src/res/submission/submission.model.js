import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const submissionSchema = new mongoose.Schema(
  {
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
    date: String,
    files: [{}],
  },
  { timestamps: true }
);

submissionSchema.plugin(mongoosePaginate);

export const Submission = mongoose.model('submission', submissionSchema);
