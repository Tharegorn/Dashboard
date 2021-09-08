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
        perm: req[0].perm,
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

async function allUsers(conn, name) {
  const req = await conn.query("SELECT * FROM users WHERE name != '" + name + "';")
  let result = [];
  for (var a = 0; req[a]; a++) {
    result = [...result, req[a]];
  }
  return (await Promise.resolve(result));
}

async function Delete(conn, id) {
  const res = await conn.query("DELETE FROM tokens WHERE user_id = '" + id + "';")
  const req = await conn.query("DELETE FROM users WHERE id = '" + id + "';")
}

async function Promove(conn, id, perm) {
  await conn.query("DELETE FROM tokens WHERE user_id = '" + id + "';")
  await conn.query("UPDATE users SET perm = '" + perm + "' WHERE id = '" + id + "';")
}

async function check_token(conn, token) {
  const req = await conn.query("SELECT * FROM tokens WHERE token = '" + token + "';")
  if (!req[0]) {
    return (await Promise.resolve("failure"))
  } else {
    return (await Promise.resolve("success"))
  }
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
            { name: response.name, token: rdm, perm: response.perm },
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
    app.post("/loadusers", (req, res) => {
      res.set("Content-Type", "application/json");
      if (req.body.name) {
        allUsers(conn, req.body.name).then((response) => {
          res.status(200).json({ data: response, status: "deco", code: 200 });
        })
      }
    })
    app.post("/delete", (req, res) => {
      res.set("Content-Type", "application/json");
      if (req.body.id) {
        Delete(conn, req.body.id);
        res.status(200).json({ status: "deco", code: 200 });
      }
    })
    app.post("/promove", (req, res) => {
      res.set("Content-Type", "application/json");
      Promove(conn, req.body.id, req.body.perm);
      res.status(200).json({ status: "deco", code: 200 });
    })
    app.post("/token", (req, res) => {
      res.set("Content-Type", "application/json");
      if (req.body.token) {
        var base64Url = req.body.token.split('.')[1];
        if (!base64Url) res.status(500).json({ status: "Failure", code: 500 });
        else {
          var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));
          var result = JSON.parse(jsonPayload)
          if (!result.name) res.status(500).json({ status: "Failure", code: 500 });
          else {
            check_token(conn, result.token).then((response) => {
              if (response == "failure") res.status(500).json({ status: "Failure", code: 500 });
              else res.status(200).json({ status: "Success", code: 200 });
            })
          }
        }
      } else {
        res.status(500).json({ status: "Failure", code: 500 });
      }
    });
  } catch (err) {
    throw err;
  }
}

createConnection();
