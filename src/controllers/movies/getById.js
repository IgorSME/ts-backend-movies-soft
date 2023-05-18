const { requestError } = require("../../helpers");
const { Movies } = require("../../models");

const getById = async (req, res) => {
  const { idParam } = req.params;

  const result = await Movies.findById(idParam);
  if (!result) {
    throw requestError(`Movie with id=${idParam} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getById;
