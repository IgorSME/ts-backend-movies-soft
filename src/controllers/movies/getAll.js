const { Movies } = require("../../models");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const movies = await Movies.find({ owner: _id }, "", {
    skip,
    limit,
  }).populate("owner", "_id email");

  res.status(200).json({
    status: "success",
    code: 200,
    data: { movies },
  });
};

module.exports = getAll;
