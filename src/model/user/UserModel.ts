import mongoose, { Schema, Document, model } from 'mongoose';

// Define the User interface
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  isActive: boolean;
  created: Date;
  modified: Date;
  last_login?: Date;
  secretKey?: string;
  credit?: number;
}

// Define the schema for the User model
const UserSchema: Schema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  created: { type: Date, default: Date.now },
  modified: { type: Date, default: Date.now },
  last_login: { type: Date },
  secretKey: { type: String },
  credit: { type: Number, default: 0 }
});

// Middleware to update the modified date before saving
UserSchema.pre<IUser>('save', function(next) {
  this.modified = new Date();
  next();
});

// Create and export the User model
const User = model<IUser>('users', UserSchema);
export default User;