const getCurrent = async (req, res) => {
  const { username, email } = req.user;

  res.json({
    user: {
      username,
      email,
    },
  });
};

module.exports = getCurrent;
