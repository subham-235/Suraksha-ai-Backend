const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validate = require("../utils/validator");
const redisClient=require("../config/redis");

const register = async (req, res) => {
  try {
    validate(req.body);

    const { fullName, emailId, password } = req.body;

    req.body.password = await bcrypt.hash(password, 10);
    req.body.role = "user";

    const user = await User.create(req.body);
    // console.log(user);

    const token = jwt.sign(
      { _id: user._id, emailId: emailId, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: 60*60 },
    );
    const reply = {
      fullName: user.fullName,
      emailId: user.emailId,
      _id: user._id,
      role: user.role,
    };

    res.cookie("token", token, { maxAge: 60 * 60 * 1000 });
    res.status(201).json({
      user: reply,
      massage: "Registered Successfully...",
    });
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
};

const login = async (req, res) => {
  try {
     const { emailId, password } = req.body;
  if (!emailId) {
    throw new Error("Credentials Missing..");
  }
  if (!password) {
    throw new Error("Credentials Missing..");
  }

  const user = await User.findOne({ emailId });
  if (!user) {
    throw new Error("User not present...");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error("Some Credential is not mathching...");
  }
  const token = jwt.sign(
    { _id: user._id, emailId: emailId, role: user.role },
    process.env.JWT_KEY,
    { expiresIn: "7d" },
  );
  const reply = {
    fullName: user.fullName,
    emailId: user.emailId,
    _id: user._id,
    role: user.role,
  };
  res.cookie("token", token, { maxAge: 60 * 60 * 1000 });
  res.status(200).json({
      user: reply,
      massage: "Login Successfully...",
    });
  } catch (err) {
    res.status(401).send("Error : " + err.message);
  }
 
};

const logout = async (req, res) => {
  try {
// Validate the token
const {token}=req.cookies;


const payload=jwt.decode(token);

await redisClient.set(`token:${token}`,'Blocked');
await redisClient.expireAt(`token:${token}`,payload.exp);

res.cookie("token",null,{expires:new Date(Date.now())});
res.send("Logged out Successfully...")
  } catch (err) {
    res.status(503).send("Error : " + err.message);
  }
};

module.exports = {register,login,logout};
