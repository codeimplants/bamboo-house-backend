const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const app = express();
const port = process.env.PORT || 3000;
const dbURI = `mongodb+srv://codeimplants:xfYn0CHToHVZrEjK@bamboo-house.pr3f2a5.mongodb.net/bamboo-house`;

const authentication = require("./api/auth/authentication");
const guest = require("./api/user/guest");

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
dotenv.config()

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('DB connected'), app.listen(port, () => { console.log(`Running on port ${port}`); }))
  .catch((err) => console.log(err));

// Routes
app.use("/", authentication);
app.use("/", guest)