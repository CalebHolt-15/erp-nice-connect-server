import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const quizSchema = new mongoose.Schema(
  {
    course: String,
    subject: String,
    schoolId: String,
    teacherId: String,
    questions: [
      {
        questionText: String,
        answerOptions: [{ answerText: String, isCorrect: Boolean }],
        // noOfCorrectAns: Number,
      },
    ],
  },
  { timestamps: true }
);

quizSchema.plugin(mongoosePaginate);

export const Quiz = mongoose.model('quiz', quizSchema);
