import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const submissionSchema = new mongoose.Schema(
  {
    date: String,
    files: [String],
    answers: [String],
    task: {
      type: mongoose.SchemaTypes.ObjectId,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
    },
  },
  { timestamps: true }
);

submissionSchema.plugin(mongoosePaginate);

export const Submission = mongoose.model('submission', submissionSchema);
