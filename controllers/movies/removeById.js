const { requestError } = require("../../helpers");
const { Movies } = require("../../models");

const removeById = async (req, res) => {
  const { idParam } = req.params;
  const result = await Movies.findByIdAndRemove(idParam);
  if (!result) {
    throw new NotFound(`Movie with id=${idParam} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data: {
      result,
    },
  });
};

module.exports = removeById;
