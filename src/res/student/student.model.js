import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    school: {
      type: mongoose.SchemaTypes.ObjectId,
    },
    class: {
      type: mongoose.SchemaTypes.ObjectId,
    },
    courses: [
      {
        type: mongoose.SchemaTypes.ObjectId,
      },
    ],
  },
  { timestamps: true }
);

export const Student = mongoose.model('student', studentSchema);
