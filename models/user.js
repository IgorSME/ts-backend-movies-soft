const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = new Schema(
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

const joiRegisterSchema = Joi.object({
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
const joiRefreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

const User = model("user", userSchema);

module.exports = {
  User,
  joiLoginSchema,
  joiRegisterSchema,
  joiRefreshTokenSchema,
};
