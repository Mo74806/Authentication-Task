//function that check the the provided token  and if its correct it let the user login
const jwt = require("jsonwebtoken");
module.exports.checkAuth = async (req, res, next) => {
  if (!req.cookies.token) {
    return res.status(403).send("please Login");
  } else {
    try {
      console.log(req.cookies.token);
      const decoded = jwt.verify(req.cookies.token, "secret");
      req.user = decoded;
    } catch (err) {
      return res.status(401).send("please login");
    }
    return next();
  }
};
