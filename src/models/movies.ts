import { Schema, model } from "mongoose";
import Joi, { ObjectSchema } from "joi";
import { IMovieSchema } from "../types/appType";

const movieSchema:Schema<IMovieSchema> = new Schema<IMovieSchema>(
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

const joiMoviesSchema:ObjectSchema = Joi.object({
  date: Joi.date().timestamp("unix").required(),
  title: Joi.string().required(),
  director: Joi.string().required(),
});

const Movies = model<IMovieSchema>("movies", movieSchema);


export  {
  Movies,
  joiMoviesSchema,
};
