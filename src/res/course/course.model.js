import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  name: String,
  section: String,
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
});

export const Course = mongoose.model('course', courseSchema);
