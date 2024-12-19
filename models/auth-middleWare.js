const { decode } = require("punycode");

const authMiddleWare = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];
  if (!token) res.send({ message: "no token in header" });
  const decodedToken = jwt.verify(
    {
      token,
    },
    process.env.JWT_SECRET
  );
  if (decodedToken) {
    next();
  } else {
    res.json({ message: "invalid token" });
  }
};
module.exports = authMiddleWare;
