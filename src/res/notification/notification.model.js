import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const notificatonSchema = new mongoose.Schema(
  {
    title: String,
    text: String,
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      required: true,
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'school',
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'course',
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'subject',
    },
  },
  { timestamps: true }
);

notificatonSchema.plugin(mongoosePaginate);

export const Notification = mongoose.model('notification', notificatonSchema);
