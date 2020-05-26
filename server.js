const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

// database connection
mongoose.set("useCreateIndex", true);
mongoose.connect(
  `mongodb://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@ds243049.mlab.com:43049/society-management`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
mongoose.set("useFindAndModify", false);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

app.listen(process.env.port || 4000);