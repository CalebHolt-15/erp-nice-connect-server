import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const courseSchema = new mongoose.Schema(
  {
    name: String,
    subjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subject',
      },
    ],
  },
  { timestamps: true }
);

courseSchema.plugin(mongoosePaginate);

export const Course = mongoose.model('course', courseSchema);
