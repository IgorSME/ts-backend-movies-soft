const { Schema, model } = require("mongoose");
const Joi = require("joi");

const movieSchema = new Schema(
  {
    date: {
      type: Date,
      require: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
    title: {
      type: String,
      required: [true, "Set title "],
    },
    director: {
      type: String,
      required: [true, "Set director "],
    },
  },
  { versionKey: false, timestamps: true }
);

const joiMoviesSchema = Joi.object({
  date: Joi.date().timestamp("unix").required(),
  title: Joi.string().required(),
  director: Joi.string().required(),
});

const Movies = model("movies", movieSchema);

module.exports = {
  Movies,
  joiMoviesSchema,
};
