import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      // required: true,
      // unique: true, index: true
    },
    email: {
      type: String,
      // required: true,
      // unique: true,
      //  index: true
    },
    role: {
      type: String,
      // required: true
    },
    password: {
      type: String,
      // required: true
    },
    fullName: {
      type: String,
      // required: true,
      // unique: true, index: true
    },
    avatar: {
      type: String,
      // required: true,
      // unique: true, index: true
    },
    ability: [
      {
        action: String,
        subject: String,
      },
    ],
    // role: "admin",
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,//COMMENT THIS FOR SUPERUSER SIGNUP
      ref: 'user',
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    this.password = await bcrypt.hash(this.password, 1);
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

    // fullName: 'John Doe',
    //   username: 'johndoe',
    //   password: 'admin',
    //   avatar: require('@src/assets/images/portrait/small/avatar-s-11.jpg').default,
    //   email: 'admin@demo.com',
    //   role: 'admin',

    // extras: {
    //   eCommerceCartItemsCount: Number
    // }
     // phNo: {
    //   type: String,
    //   // required: true,
    //   // unique: true, index: true
    // },
