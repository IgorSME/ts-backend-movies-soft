const {
  User,
  joiLoginSchema,
  joiRegisterSchema,
  joiRefreshTokenSchema,
} = require("./user");

const { Movies, joiMoviesSchema } = require("./movies");

module.exports = {
  User,
  joiLoginSchema,
  joiRegisterSchema,
  joiRefreshTokenSchema,
  Movies,
  joiMoviesSchema,
};
