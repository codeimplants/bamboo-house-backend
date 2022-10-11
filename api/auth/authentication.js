const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authModel = require("../models/authModel");

router.post("/login", [body("email").not().isEmpty(), body("password").not().isEmpty()], async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0],
    });
  }

  const { email, password } = req.body;

  authModel.find({ email: email }, (err, data) => {
    if (err) res.status(401).json({ error: "Please Enter a Valid Email!!", details: err });

    if (data.length == 0) res.status(401).json({ error: "Please Enter a Valid Email!!" });
    else {
      bcrypt.compare(req.body.password, data[0].password, (error, result) => {
        if (error) return res.status(401).json(error);
        if (result == true) {
          let token = jwt.sign({ email: data[0].email }, "secret", {
            expiresIn: "90d",
          });
          data[0].save().then(() => {
            return res.status(200).json({ status: 200, email: data[0].email, role: data[0].role, token })
          }).catch((error) => {
            return res.status(404).json({ error, message: "Something went wrong" })
          });
        } else if (result == false) {
          res.status(401).json({ error: "Wrong password" });
        }
      });
    }
  });
}
);


router.post("/register", [body("email").isEmail(), body("email").not().isEmpty(), body("password").not().isEmpty()],
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: errors.array()[0],
      });
    }

    if (req.body.password.length < 5) {
      return res.status(401).json({
        error: "Password cannot be smaller than 5 characters",
      });
    }

    const emailExist = await authModel.findOne({ email: req.body.email });

    if (emailExist) return res.status(401).json({ error: "Admin with the E-mail already exists" });

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const userDetails = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      role: "admin"
    };

    const newUser = new authModel(userDetails);
    newUser.save().then((result) => {
      return res.status(200).json({ msg: "Admin Registered Successfully!!!", details: result });
    })
      .catch((error) => {
        return res.status(401).json({ error: "Something Went Wrong!!!" });
      });
  }
);

module.exports = router;