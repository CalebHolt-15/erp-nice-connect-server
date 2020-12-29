import mongoose from 'mongoose';
import { mongo } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const schoolSchema = new mongoose.Schema(
  {
    name: String,
    address: {
      line1: String,
      line2: String,
      landmark: String,
      city: String,
      state: String,
      pincode: String,
    },
    board: String,
    courses: [
      {
        name: String,
        subjects: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'subject',
          },
        ],
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

schoolSchema.plugin(mongoosePaginate);

export const School = mongoose.model('school', schoolSchema);
