import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  enrollmentYear: number;
  google: boolean; 
}

const UserSchema: Schema = new Schema<IUser>({
  name: {
    type: String,
    required: function (this: IUser) {
      return !this.google;
    }
  },
  email:         { type: String, required: true, unique: true },
  password:      { type: String, required: false },
  enrollmentYear:{ type: Number, required: true },
  google:        { type: Boolean, default: false }   // ← lo añadimos aquí
});

export default mongoose.model<IUser>('User', UserSchema);
