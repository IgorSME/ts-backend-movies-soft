import { Schema, model } from "mongoose";
import Joi, { ObjectSchema } from "joi";
import { IUserSchema } from "../types/appType";


const userSchema:Schema<IUserSchema> = new Schema<IUserSchema>(
  {
    username: {
      type: String,
      required: [true, "Set name for user"],
      minlength: 3,
    },
    email: {
      type: String,
      required: [true, "Set email for user"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
      minlength: 6,
    },
    accessToken: {
      type: String,
      default: null,
    },
    refreshToken: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiRegisterSchema:ObjectSchema = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(6).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
});
const joiLoginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
});
const joiRefreshTokenSchema:ObjectSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

const User = model<IUserSchema>("user", userSchema);

export {
  User,
  joiLoginSchema,
  joiRegisterSchema,
  joiRefreshTokenSchema,
};
