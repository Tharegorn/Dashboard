const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const about = require("./data")
const users = require("./users/index")
const notes = require("./notes/index");
const widgets = require("./widgets/index")
const epitech = require("./epitech/index")
const youtube = require("./youtube/index")
const currency = require("./currency/index")

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



// POST
  //TOKEN HANGLING (REGISTRATION LOGIN AND REFRESH)
app.post("/login", users.login);
app.post("/register", users.register);
app.post("/refresh", users.refreshToken);
app.post("/epitech/auth", users.userMiddleware, epitech.set_autologin)
  // USER PERMISSIONS HANDLING
app.post("/promote", users.adminMiddleware, users.promote);
app.post("/demote", users.adminMiddleware, users.demote);
app.post("/delete", users.adminMiddleware, users.delete)
  // USER SELF MODIFYING
app.post("/update/name", users.userMiddleware, users.name_update)
app.post("/update/password", users.userMiddleware, users.password_update)
  // NOTES HANDLING
app.post("/new_note", users.userMiddleware, notes.new_note)
app.post("/update_note", users.userMiddleware, notes.update_note)
app.post("/delete_note", users.userMiddleware, notes.delete_note)

// GET
app.get("/users", users.adminMiddleware, users.loadUsers);
app.get("/routes", users.userMiddleware, users.access_routes);
app.get("/note", users.userMiddleware, notes.get_notes)
app.get("/epitech/profile", users.userMiddleware, epitech.get_profile)
app.get("/widget/youtube/channel", users.userMiddleware, youtube.channel)
app.get("/widget/currency/exchange", users.userMiddleware, currency.exchange)
app.get("/widget/currency/values", users.userMiddleware, currency.get_money)
app.get("/about.json", (req, res) => {

  about.json.client.host = req.hostname;
  about.json.server.current_time = Date.now();
  res.json(about.json);
});
app.get("/user_widgets", widgets.get_user_widgets);
