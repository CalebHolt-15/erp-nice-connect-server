import mongoose from 'mongoose';

const schoolSchema = new mongoose.Schema(
  {
    name: String,
    address: {
      line1: String,
      line2: String,
      landmark: String,
      city: String,
      state: String,
      pincode: Number,
    },
    courses: [{ type: mongoose.SchemaTypes.ObjectId }],
  },
  { timestamps: true }
);

export const School = mongoose.model('school', schoolSchema);
