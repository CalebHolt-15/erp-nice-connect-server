import mongoose from 'mongoose';
import { mongo } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const teacherSchema = new mongoose.Schema(
  {
    name: String,
    phNo: {
      type: String,
      unique: true,
    },
    password: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
  },
  { timestamps: true }
);

teacherSchema.plugin(mongoosePaginate);

export const Teacher = mongoose.model('teacher', teacherSchema);
