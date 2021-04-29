import mongoose, { Schema, Document } from 'mongoose';

export enum TestGender {
  male = 'male',
  female = 'female',
  undisclosed = 'undisclosed'
}

export interface TestAddress extends Document {
  street: string;
  city: string;
  postCode: string;
}

export class Test 
{
  email = "";
  firstName = "";
  lastName = "";
  gender?: TestGender;
  address?: TestAddress;
}

const TestSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  // Gets the Mongoose enum from the TypeScript enum
  gender: { type: String, enum: Object.values(TestGender) },
  address: {
    street: { type: String },
    city: { type: String },
    postCode: { type: String }
  }
});

interface TestDoc extends Test, Document { }

// Export the model and return your interface
export const TestModel = mongoose.model<TestDoc>('Test', TestSchema);
