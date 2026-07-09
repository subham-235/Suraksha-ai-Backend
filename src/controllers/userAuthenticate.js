const User=require('../models/user');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const register=async (req,res)=>{
 try {
    // validate(req.body);

    const { fullName, emailId, password } = req.body;

    req.body.password = await bcrypt.hash(password, 10);
    req.body.role='user';

    const user = await User.create(req.body);

    const token = jwt.sign(
      { _id: user._id, emailId: emailId ,role:user.role},
      process.env.JWT_KEY,
      { expiresIn: 60 * 60 }
    );
      const reply={
      fullName:user.fullName,
      emailId:user.emailId,
      _id:user._id,
       role:user.role
    }

    res.cookie("token", token, { maxAge: 60 * 60 * 1000 });
    res.status(201).json({
      user:reply,
      massage:"Registered Successfully..."
    });
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
}
module.exports=register