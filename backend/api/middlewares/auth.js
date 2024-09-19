const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Check it the user is authenticated or not
exports.auth = async (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res
      .status(401)
      .send({ message: "Login first to access the resource" });
  }

  await jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
    if (err) {
      return res
        .status(401)
        .send({ message: "Login first to access the resource" });
    }
    if (decoded) {
      req.user = await User.findById(decoded.id);
      next();
    }
  });
};
