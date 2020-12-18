import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const subjectSchema = new mongoose.Schema(
  {
    name: String,
    totalMarks: String,
    notifications: [{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'notification',
    }],
    course: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'course'
    }
  },
  { timestamps: true }
);

subjectSchema.plugin(mongoosePaginate);

export const Subject = mongoose.model('subject', subjectSchema);
