import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const employeeSchema = new mongoose.Schema(
  {
    name: {
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
    password: {
      type: String,
      // required: true,
      // unique: true,
      //  index: true
    },

    ability: [
      {
        action: String,
        subject: String,
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: 'user',
    },
  },
  { timestamps: true }
);

employeeSchema.plugin(mongoosePaginate);

export const Employee = mongoose.model('employee', employeeSchema);

//
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) {
//     return next();
//   }

//   try {
//     this.password = await bcrypt.hash(this.password, 1);
//     next();
//   } catch (e) {
//     console.error(e);
//     return next(e);
//   }
// });

// userSchema.methods.checkPassword = function (password) {
//   const passwordHash = this.password;
//   return new Promise((resolve, reject) => {
//     bcrypt.compare(password, passwordHash, (err, same) => {
//       if (err) {
//         return reject(err);
//       }

//       resolve(same);
//     });
//   });
// };
