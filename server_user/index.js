const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mariadb = require("mariadb");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const pool = mariadb.createPool({
  host: "db",
  database: "user_db",
  user: "user",
  password: "test",
  connectionLimit: 5,
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.listen(4242, () => {
  console.log("Listening on port 4242.");
});

async function getInfo(conn, name) {
  const req = await conn.query("SELECT * FROM users;");
  if (req[0]) {
    for (var i = 0; req[i]; i++) {
      if (name === req[i].name) return (result = await Promise.resolve(1));
    }
    return (result = await Promise.resolve(0));
  } else {
    return (result = await Promise.resolve(2));
  }
}

async function getInfoWithMdp(conn, name, pass) {
  const req = await conn.query(
    "SELECT * FROM users WHERE name='" + name + "';"
  );
  if (req[0]) {
    const crypt = await bcrypt.compare(pass, req[0].password);
    if (crypt)
      return (result = await Promise.resolve({
        code: 0,
        name: req[0].name,
        id: req[0].id,
      }));
    else return (result = await Promise.resolve({ code: 1 }));
  } else return (result = await Promise.resolve({ code: 1 }));
}
async function addUser(conn, name, password) {
  const hpass = await bcrypt.hash(password, 10);
  const req = await conn.query(
    "INSERT INTO users (name, password, perm) VALUES ('" +
      name +
      "', '" +
      hpass +
      "', 0);"
  );
}

function token_gen(length) {
  var randomChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789?%ù*$&-_@";
  var result = "";
  for (var i = 0; i < length; i++) {
    result += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length)
    );
  }
  return result;
}

async function addToken(conn, token, uid) {
  const req = await conn.query(
    "INSERT INTO tokens (user_id, token) VALUES ('" +
      uid +
      "', '" +
      token +
      "');"
  );
}

async function veryfyIdentity(conn, token) {
  const req = await conn.query(
    "SELECT * FROM tokens WHERE token='" + jwt.decode(token).token + "';"
  );
  if (req[0])
    return (result = await Promise.resolve(0));
  else
  return (result = await Promise.resolve(1));
}

async function createConnection() {
  let conn;
  try {
    conn = await pool.getConnection();
    app.post("/verify"),
      (req, res) => {
        res.set("Content-Type", "application/json");
      };
    app.post("/login", (req, res) => {
      res.set("Content-Type", "application/json");
      getInfoWithMdp(conn, req.body.name, req.body.pass).then((response) => {
        if (response.code === 0) {
          const rdm = token_gen(25);
          addToken(conn, rdm, response.id);
          const token = jwt.sign(
            { name: response.name, token: rdm },
            process.env.JWT_TOKEN,
            {}
          );
          res.status(200).json({
            status: "success",
            code: 200,
            data: { message: "Created", token: token },
          });
        } else {
          res.status(500).json({
            status: "failure",
            code: 500,
            data: { message: "Invalid credentials" },
          });
        }
      });
    });
    app.post("/register", (req, res) => {
      res.set("Content-Type", "application/json");
      getInfo(conn, req.body.name).then((response) => {
        if (response != 1) {
          addUser(conn, req.body.name, req.body.pass);
          res.status(200).json({
            status: "success",
            code: 200,
            data: { message: "Created" },
          });
        } else {
          res.status(500).json({
            status: "failure",
            code: 500,
            data: { message: "API server error" },
          });
        }
      });
    });
  } catch (err) {
    throw err;
  }
}

createConnection();
