const { BadRequestError } = require("../errors");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  if (!username || !password) {
    throw new BadRequestError("Please provide email and password ");
  }
  // this id using Date() is only for demo
  const id = new Date().getDate();
  // JWT_SECRET in .env: for production use long complex ungeuessable string value
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(200).json({ msg: "user created", token });
  // res.status(200).json("Fake login/register/signup Route ");
};

const dashboard = async (req, res) => {
  console.log(req.user);
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
  //   res.status(200).json({
  //     msg: `Hello, ${req.user.username}`,
  //     secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  //   });
};

module.exports = {
  login,
  dashboard,
};
