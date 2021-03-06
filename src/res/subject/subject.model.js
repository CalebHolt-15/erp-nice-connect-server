import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const subjectSchema = new mongoose.Schema(
  {
    name: String,
    course: String,
  },
  { timestamps: true }
);

subjectSchema.plugin(mongoosePaginate);

export const Subject = mongoose.model('subject', subjectSchema);
