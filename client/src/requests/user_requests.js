import axios from "axios";


const instance = axios.create({
  baseURL: "http://localhost:8080/"
})

function get_access(token, home) {
  return new Promise(function (resolve, reject) {
    instance.get("/routes?route=" + home, {
      headers: {
        "authorization": "Bearer " + token
      }
    }).then(() => {
      resolve()
    }).catch(() => {
      reject();
    })

  })
}

function createUser(name, pass, confirm) {
  return new Promise(function (resolve, reject) {
    instance
      .post("/register", { user: name, password: pass, confirm_password: confirm })
      .then((res) => {
        resolve(res);
      })
      .catch((err) =>
        setImmediate(() => {
          reject(err);
        })
      );
  });
}

async function loginUser(name, pass) {
  return new Promise(function (resolve, reject) {
    instance
      .post("/login", { user: name, password: pass })
      .then((res) => {
        resolve(res);
      })
      .catch((err) =>
        setImmediate(() => {
          reject(err);
        })
      );
  });
}

function loadUsers(token) {
  return new Promise(function (resolve, reject) {
    instance
      .get("/users", { headers: { "authorization": "Bearer " + token } })
      .then((res) => {
        resolve(res);
      })
      .catch((err) =>
        setImmediate(() => {
          reject(err);
        })
      );
  });
}

function deleteUser(id, token) {
  return new Promise(function (resolve, reject) {
    instance
      .post("/delete", { id: id }, { headers: { "authorization": "Bearer " + token } })
      .then((res) => {
        resolve(res);
      })
      .catch((err) =>
        setImmediate(() => {
          reject(err);
        })
      );
  });
}

function promove(id, perm, token) {
  return new Promise(function (resolve, reject) {
    instance
      .post("/promote", { id: id, perm: perm }, { headers: { "authorization": "Bearer " + token } })
      .then((res) => {
        resolve(res);
      })
      .catch((err) =>
        setImmediate(() => {
          reject(err);
        })
      );
  });
}
function demote(id, perm, token) {
  return new Promise(function (resolve, reject) {
    instance
      .post("/demote", { id: id, perm: perm }, { headers: { "authorization": "Bearer " + token } })
      .then((res) => {
        resolve(res);
      })
      .catch((err) =>
        setImmediate(() => {
          reject(err);
        })
      );
  });
}

function updt_name(name, token) {
  return new Promise(function (resolve, reject) {
    instance
      .post("/update/name", { user: name }, { headers: { "authorization": "Bearer " + token }})
      .then((res) => {
        resolve(res);
      })
      .catch((err) =>
        setImmediate(() => {
          reject(err);
        })
      );
  });
}

function updt_psswd(password, token) {
  return new Promise(function (resolve, reject) {
    instance
      .post("/update/password", {
        password: password,
      }, { headers: { "authorization": "Bearer " + token }})
      .then((res) => {
        resolve(res);
      })
      .catch((err) =>
        setImmediate(() => {
          reject(err);
        })
      );
  });
}

function addNote(title, content, token) {
  instance.post("/new_note", {
    title: title,
    content: content,
  }, {
    headers: {
      "authorization": "Bearer " + token,
    }
  });
}

function getNotes(token) {
  return new Promise(function (resolve, reject) {
    instance
      .get("/note", { headers: { "authorization": "Bearer " + token } })
      .then((res) => {
        resolve(res);
      })
      .catch((err) =>
        setImmediate(() => {
          reject(err);
        })
      );
  });
}

function update_note_content(id, content, token) {
  axios.post("http://localhost:8080/update_note", { id: id, content: content }, { headers: { "authorization": "Bearer " + token } });
}
function update_note_title(id, title, token) {
  axios.post("http://localhost:8080/update_note", { id: id, title: title }, { headers: { "authorization": "Bearer " + token } });
}

function delete_note(id, token) {
  axios.post("http://localhost:8080/delete_note", { id: id }, {
    headers: {
      "authorization": "Bearer " + token
    }
  });
}

function set_autologin(auth, token) {
  instance.post("/epitech/auth", {auth: auth}, {headers: { "authorization": "Bearer " + token }}).then((res) => {
    localStorage.setItem("session_id", res.data.token)
    localStorage.setItem("session_id_refresh", res.data.refresh)
  }).catch((err) => {
    throw err
  })
}
export {
  set_autologin,
  createUser,
  loginUser,
  loadUsers,
  deleteUser,
  promove,
  demote,
  updt_name,
  updt_psswd,
  addNote,
  getNotes,
  update_note_content,
  update_note_title,
  delete_note,
  get_access
};
