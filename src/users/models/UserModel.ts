import { model, Schema, Model, Document, Types } from "mongoose";

export enum Gender {
  MALE = "Male",
  FEMALE = "Female",
  OTHER = "Other",
  UNDEFINED = "Undefined",
}

export interface IUser extends Document {
  givenNames: string;
  familyNames?: string;
  email?: string;
  phoneNumber: string;
  password: string;
  countryCode: string;
  cityName?: string;
  birthDate?: string;
  gender?: Gender;
  createdAt: string;
  updatedAt: string;
}

const UserSchema: Schema = new Schema({
  givenNames: { required: true, type: String, minlength: 1, maxlength: 100 },
  familyNames: {
    default: "-",
    required: false,
    type: String,
    minlength: 1,
    maxlength: 100,
  },
  email: {
    default: "-",
    unique: true,
    required: false,
    type: String,
    minlength: 1,
    maxlength: 100,
  },
  phoneNumber: {
    required: true,
    unique: true,
    type: String,
    minlength: 1,
    maxlength: 50,
  },
  password: {
    required: true,
    type: String,
  },
  countryCode: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 2,
  },
  cityName: {
    default: "-",
    required: false,
    type: String,
    minlength: 1,
    maxlength: 100,
  },
  birthDate: {
    default: "-",
    required: false,
    type: String,
    minlength: 1,
    maxlength: 100,
  },
  gender: {
    default: Gender.UNDEFINED,
    type: String,
    required: false,
    enum: Object.values(Gender),
  },
  createdAt: {
    required: true,
    type: String,
    minlength: 1,
    maxlength: 100,
  },
  updatedAt: {
    required: true,
    type: String,
    minlength: 1,
    maxlength: 100,
  },
});

const UserModel: Model<IUser> = model("UserModel", UserSchema);

export { UserModel };
