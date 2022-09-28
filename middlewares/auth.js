const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.verifiedUser = verified
    
    next();
  } catch (error) {
    throw Error("Invalid Token");
  }
};

module.exports = { authenticate };
