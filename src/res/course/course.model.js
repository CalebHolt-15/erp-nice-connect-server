import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const courseSchema = new mongoose.Schema(
  {
    name: String,
    section: String,
    subjects: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        //   required: true,
        ref: 'subject',
      },
    ],
    school: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        //   required: true,
        ref: 'school',
      },
    ],
  },
  { timestamps: true }
);

courseSchema.plugin(mongoosePaginate);

export const Course = mongoose.model('course', courseSchema);
