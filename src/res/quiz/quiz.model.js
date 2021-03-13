import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const quizSchema = new mongoose.Schema({
  questions: [{ question: String }],
});

quizSchema.plugin(mongoosePaginate);

export const Quiz = mongoose.model('quiz', quizSchema);
