import mongoose from 'mongoose';
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
    courses: String,
  },
  { timestamps: true }
);

schoolSchema.plugin(mongoosePaginate);

export const School = mongoose.model('school', schoolSchema);