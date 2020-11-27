import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const notificatonSchema = new mongoose.Schema(
  {
    title: String,
    text: String,
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      //   required: true,
    },
  },
  { timestamps: true }
);

export const Notification = mongoose.model('notification', notificatonSchema);
