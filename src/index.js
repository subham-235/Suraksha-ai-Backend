const express = require("express");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const main = require("./config/db");
const app = express();
// const cookieParser = require("cookie-parser");
const authRouter = require("./routes/userAuth");
// const problemRouter=require('./routes/problemCreator');
// const submitRouter=require('./routes/submit');
// const redisClient = require("./config/redis");
// const authGoogle=require('./routes/authRoutes');
// const cors=require('cors');
// const aiRouter = require("./routes/aiChatting")
// // const passport = require("passport");
// // require("./config/passport")

// app.use(cors({
//   origin:'http://localhost:5173',
//   credentials:true
// }))
app.use(express.json());

app.use("/user", authRouter);
// app.use("/auth",authGoogle);

const InitializeConnection = async () => {
  try {
    // await Promise.all([main(),redisClient.connect()])
    // console.log("DB Connected..");

    await main();

    app.listen(process.env.PORT, () => {
      console.log(`Server listening on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.log("Error : " + err);
  }
};
InitializeConnection();
