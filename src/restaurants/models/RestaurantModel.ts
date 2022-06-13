import { model, Schema, Model, Document, Types } from "mongoose";

export enum Gender {
  MALE = "Male",
  FEMALE = "Female",
  OTHER = "Other",
  UNDEFINED = "Undefined",
}

export interface IRestaurant extends Document {
  name: string;
  description?: string;
  locationLatitude?: number;
  locationLongitude?: number;
  countryCode: string;
  cityName?: string;
  createdAt: string;
  updatedAt: string;
}

const RestaurantSchema: Schema = new Schema({
  name: {
    required: true,
    type: String,
    minlength: 1,
    maxlength: 100,
  },
  description: {
    default: "-",
    required: false,
    type: String,
    minlength: 1,
    maxlength: 200,
  },
  locationLatitude: {
    default: 0,
    required: false,
    type: Number,
    min: -90,
    max: 90,
  },
  locationLongitude: {
    default: 0,
    required: false,
    type: Number,
    min: -180,
    max: 180,
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

const RestaurantModel: Model<IRestaurant> = model(
  "RestaurantModel",
  RestaurantSchema
);

export { RestaurantModel };
