import mongoose from "mongoose";
import {Password} from "../services/password";

// Describes the properties that are required to create a new User
interface UserAttrs {
    email: string;
    password: string;
}

// Describes the properties that a User model has
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

// Describes the properties that a User Document model has
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

userSchema.pre('save', async function(done) {
  if (this.isModified('password')) {
      const hashed = await Password.toHash(this.get('password'));
      this.set('password', hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export {User};