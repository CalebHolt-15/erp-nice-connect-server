import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: String,
    role: String,
    firstName: String,
    lastName: String,
    subjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subject',
      },
    ],
    courses: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'course',
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    this.password = await bcrypt.hash(this.password, 8);
    next();
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

userSchema.methods.checkPassword = function (password) {
  const passwordHash = this.password;
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err, same) => {
      if (err) {
        return reject(err);
      }

      resolve(same);
    });
  });
};

export const User = mongoose.model('user', userSchema);
