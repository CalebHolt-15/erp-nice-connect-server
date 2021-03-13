import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const quizSchema = new mongoose.Schema({
  questions: [
    {
      questionText: String,
      answerOptions: [{ answerText: String, isCorrect: Boolean }],
    },
  ],
});

quizSchema.plugin(mongoosePaginate);

export const Quiz = mongoose.model('quiz', quizSchema);
