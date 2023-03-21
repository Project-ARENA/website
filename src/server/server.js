const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const emailjs = require("@emailjs/nodejs");
const mysql = require("mysql");
dotenv.config();

const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.REACT_APP_API_KEY_DB_HOST,
  user: process.env.REACT_APP_API_KEY_DB_USER,
  password: process.env.REACT_APP_API_KEY_DB_PASSWORD,
  database: process.env.REACT_APP_API_KEY_DB_DATABASE,
  ssl: {},
});

db.connect((err) => {
  if (err) {
    console.log(
      "Error connecting to database, please check your credentials - warning by sayf"
    );
    console.log("stopping server");
    // Stop the server
    process.exit(1);
  } else {
    console.log("Connected to database");
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Route to get users
app.get("/api/get/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      res.send(err);
      console.log(err);
    }
    res.send(result);
  });
});

//Route to get registration details and insert
app.post("/api/post/register", (req, res) => {
  const name = req.body.name;
  const surname = req.body.surname;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "INSERT INTO users (user_firstname, user_surname, user_nickname, user_password, user_email, user_admin) VALUES (?,?,?,?,?,?)",
    [name, surname, username, password, email, 0],
    (err, result) => {
      if (err) {
        res.send(err);
        console.log(err);
      }
      console.log(result);
    }
  );
});

//Route to check Login Details
app.post("/api/post/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT EXISTS (SELECT * from users WHERE user_nickname = ? AND user_password = ?);",
    [username, password],
    (err, result) => {
      if (err) {
        res.send(err);
        console.log(err);
      }
      console.log(result);
    }
  );
});

// Route to get competitions
app.get("/api/get/competitions", (req, res) => {
  db.query("SELECT * FROM competition_details", (err, result) => {
    if (err) {
      res.send(err);
      console.log(err);
    }
    res.send(result);
  });
});

// Route to get hashed password
app.get("/api/get/password/:username", (req, res) => {

  const username = req.params.username;
  db.query("SELECT user_password FROM users WHERE user_nickname = ?", username,
    (err, result) => {
      if (err) {
        console.log(err)
      }
      res.send(result)
    });
});

// Route to send email
app.post("/api/send/email", (req, res) => {
  const { name, subject, email, message } = req.body;

  emailjs.send(
    'service_c64xcqo',
    'template_d23i9to',
    {
      name: name,
      subject: subject,
      email: email,
      message: message
    },
    {
      publicKey: process.env.REACT_APP_API_KEY_PUBLIC_EMAIL,
      privateKey: process.env.REACT_APP_API_KEY_PRIVATE_EMAIL
    }
  )
    .then((result) => {
      res.status(200).send('Email sent successfully');
    })
    .catch((error) => {
      console.log(error.text);
      res.status(500).send('Error sending email');
    });
});

//ROute to check if username already exists
app.get("/api/get/doesExist/:username", (req, res) => {

  const username = req.params.username;
  db.query("SELECT 1 from users WHERE user_nickname = ?;", username,
    (err, result) => {
      if (err) {
        console.log(err)
      }
      res.send(result)
    });
});

//Type above this
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
