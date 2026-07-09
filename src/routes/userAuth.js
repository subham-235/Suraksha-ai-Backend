const userMiddleware = require("../middleware/userMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const express = require("express");
const authRouter = express.Router();
const register=require("../controllers/userAuthenticate")

// Register
authRouter.post("/register", register);
// Login
// authRouter.post("/login", login);
// logout
// authRouter.post("/logout",userMiddleware,logout);
// admin Register
// authRouter.post("/admin/register",adminMiddleware,adminRegister);
// Delete
// authRouter.delete("/delete",userMiddleware,deleteProfile);
// Auth
// authRouter.post("/auth",userMiddleware,authenticat);
module.exports=authRouter