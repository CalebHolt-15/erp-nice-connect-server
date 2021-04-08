import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const quizResultsSchema = new mongoose.Schema(
  {
    studentName: String,
    course: String,
    subject: String,
    scored: String,
    schoolId: String,
    teacherId: String,

    questions: [
      {
        questionText: String,
        answerOptions: [{ answerText: String, isCorrect: Boolean }],
      },
    ],
    selectedOptions: [String],
    // teacherId: String,
  },
  { timestamps: true }
);

quizResultsSchema.plugin(mongoosePaginate);

export const QuizResults = mongoose.model('quizresults', quizResultsSchema);
