import mongoose, { Document, Schema } from 'mongoose';

export interface ITodo extends Document {
  name: string;
  completed: boolean;
  userId: string;
}

const TodoSchema: Schema = new Schema({
  name: { type: String, required: true },
  completed: { type: Boolean, default: false },
  userId: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model<ITodo>('Todo', TodoSchema); 