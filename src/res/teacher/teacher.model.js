import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    school: {
      type: mongoose.SchemaTypes.ObjectId,
    },
    courses: [{ type: mongoose.SchemaTypes.ObjectId }],
  },
  { timestamps: true }
);

export const Teacher = mongoose.model('teacher', teacherSchema);
