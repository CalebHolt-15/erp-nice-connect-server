import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const quizSchema = new mongoose.Schema(
  {
    // noOfQstns: String,
    questions: [
      {
        questionText: String,
        answerOptions: [
          {
            answerText: String,
            isCorrect: Boolean,
          },
        ],
        marks: String,
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
  },
  { timestamps: true }
);

quizSchema.plugin(mongoosePaginate);

export const Quiz = mongoose.model('quiz', quizSchema);
