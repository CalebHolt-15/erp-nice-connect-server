import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  date: String,
  files: [String],
  answers: [String],
  task: {
    type: mongoose.SchemaTypes.ObjectId,
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
  },
});

export const Submission = mongoose.model('submission', submissionSchema);
