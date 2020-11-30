import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema(
  {
    name: String,
    totalMarks: String,
    notifications: [{ type: mongoose.SchemaTypes.ObjectId }],
  },
  { timestamps: true }
);

export const Subject = mongoose.model('subject', subjectSchema);
