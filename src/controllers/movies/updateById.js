const { requestError } = require("../../helpers");
const { Movies } = require("../../models");

const updateById = async (req, res) => {
  // const { _id } = req.user;
  const { idParam } = req.params;
  console.log("result", idParam);
  const result = await Movies.findOneAndUpdate({ _id: idParam }, req.body, {
    new: true,
  });

  if (!result) {
    throw requestError(404, `Movie with ${idParam} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};
module.exports = updateById;
