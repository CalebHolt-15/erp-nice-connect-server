import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    title: String,
    text: String,
    user: { type: mongoose.SchemaTypes.ObjectId },
  },
  { timestamps: true }
);

export const Notification = mongoose.model('notification', notificationSchema);
