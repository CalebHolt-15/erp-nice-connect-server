import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const studentSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    course: { type: String, required: true },
    phNo: { type: String, required: true },
    password: { type: String, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
  },
  { timestamps: true }
);

studentSchema.plugin(mongoosePaginate);

export const Student = mongoose.model('student', studentSchema);
