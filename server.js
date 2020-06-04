const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./databases');

const adminRoutes = require('./routings/admin');
const studentRoutes = require('./routings/student');

require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.use("/admin", adminRoutes);
app.use("/student", studentRoutes);

// database connection
db.makeDb();

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