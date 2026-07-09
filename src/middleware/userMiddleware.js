const jwt = require("jsonwebtoken");
const User = require("../models/user");
const redisClient = require("../config/redis");
async function userMiddleware(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(404).send("Token not found..");
    }
    const payload = jwt.verify(token, process.env.JWT_KEY);

    const id = payload._id;
    const result = await User.findById(id);
    if (!user) {
      res.status(404).send("No user Found...");
    }
    // const isBlocked = await redisClient.exists(`token:${token}`);

    // if (isBlocked) {
    //   return res.status(401).send("Token is blocked.");
    // }
    req.body = result;
    next();
  } catch (err) {
    res.status(401).send(err.message);
  }
}

module.exports = userMiddleware;
