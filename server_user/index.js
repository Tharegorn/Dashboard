const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mariadb = require("mariadb");
const app = express();

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

async function addUser(conn, name, password) {
  const req = await conn.query(
    "INSERT INTO users (name, password, perm) VALUES ('" + name + "', '" + password + "', 0);"
  );
}

async function createConnection() {
  let conn;
  try {
    // conn = await pool.getConnection();
    // app.get("/get_users", (res, req) => {
    //     getInfo(conn, "bite").then(response => {
    //         console.log(response)
    //     })
    // })
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
