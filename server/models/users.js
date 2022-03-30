import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    username: { type: String },
    email: { type: String },
    password: { type: String },
    following: { type: [mongoose.Schema.Types.ObjectId] },
    followers: { type: [mongoose.Schema.Types.ObjectId] },

}, { toJSON: { 
    virtuals: true,
    transform: function (doc, ret) {
     // delete ret._id;
      delete ret.password;
     // delete ret.password_reset;
      return ret;
    }

  }, timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;