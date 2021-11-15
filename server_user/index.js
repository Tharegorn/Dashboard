const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mariadb = require("mariadb");
const app = express();
const jwt = require("jsonwebtoken");

const select = require("./queries/select");
const del = require("./queries/delete");
const insert = require("./queries/insert")
const update = require("./queries/update")


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

async function createConnection() {
  let conn;
  try {
    conn = await pool.getConnection();
    app.post('/new_note', (req, res) => {
      res.set("Content-Type", "application/json");
      if (req.body.id && req.body.title && req.body.content)
        insert.add_note(conn, req.body.id, req.body.title, req.body.content);
      res.status(200).json({ status: "Success Parameters", code: 200 });
    })
    app.get('/notes', (req, res) => {
      if (req.query.id) {
        select.get_notes(conn, req.query.id).then((resp) => {
          if (resp == 0) {
            res.status(200).json({status: 200, content: null});
          } else {
            res.status(200).json({status: 200, content: resp.content});
          }
        });
      }
      res.status(200)
    });
    app.post("/verify"),
      (req, res) => {
        res.set("Content-Type", "application/json");
      };
    app.post("/login", (req, res) => {
      res.set("Content-Type", "application/json");
      select.getInfoWithMdp(conn, req.body.name, req.body.pass).then((response) => {
        if (response.code === 0) {
          const rdm = token_gen(25);
          insert.addToken(conn, rdm, response.id);
          const token = jwt.sign(
            { id: response.id, name: response.name, token: rdm, perm: response.perm },
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
      select.getInfo(conn, req.body.name).then((response) => {
        if (response != 1) {
          insert.addUser(conn, req.body.name, req.body.pass);
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
        select.allUsers(conn, req.body.name).then((response) => {
          res.status(200).json({ data: response, status: "deco", code: 200 });
        });
      }
    });
    app.post("/delete", (req, res) => {
      res.set("Content-Type", "application/json");
      if (req.body.id) {
        del.Delete(conn, req.body.id);
        res.status(200).json({ status: "deco", code: 200 });
      }
    });
    app.post("/promove", (req, res) => {
      res.set("Content-Type", "application/json");
      del.Promove(conn, req.body.id, req.body.perm);
      res.status(200).json({ status: "deco", code: 200 });
    });
    app.post("/update/password", (req, res) => {
      res.set("Content-Type", "application/json");
      if (req.body.id && req.body.password) {
        update.update(conn, null, req.body.password, req.body.id);
        res.status(200).json({ status: "Success", code: 200 });
      } else
        res.status(500).json({ status: "Missing Credentials", code: 500 })
    })
    app.post("/update/name", (req, res) => {
      res.set("Content-Type", "application/json");
      if (req.body.id && req.body.name) {
        update.update(conn, req.body.name, null, req.body.id);
        res.status(200).json({ status: "Success", code: 200 });
      } else
        res.status(500).json({ status: "Missing Credentials", code: 500 })
    })
    app.post("/token", (req, res) => {
      res.set("Content-Type", "application/json");
      if (req.body.token) {
        var base64Url = req.body.token.split(".")[1];
        if (!base64Url) res.status(500).json({ status: "Failure", code: 500 });
        else {
          var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          var jsonPayload = decodeURIComponent(
            atob(base64)
              .split("")
              .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
              })
              .join("")
          );
          var result = JSON.parse(jsonPayload);
          if (!result.name)
            res.status(500).json({ status: "Failure", code: 500 });
          else {
            select.check_token(conn, result.token).then((response) => {
              if (response == "failure")
                res.status(500).json({ status: "Failure", code: 500 });
              else res.status(200).json({ status: "Success", code: 200 });
            });
          }
        }
      } else {
        res.status(500).json({ status: "Failure", code: 500 });
      }
    });
  } catch (err) {
    throw err;
  }
  app.get("/about.json", (req, res) => {
    res.send("Salut")
  })
}
createConnection();
