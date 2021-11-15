import axios from "axios";

function createUser(name, pass) {
  return new Promise(function (resolve, reject) {
    axios
      .post("http://localhost:8080/register", { name: name, pass: pass })
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

function loginUser(name, pass) {
  return new Promise(function (resolve, reject) {
    axios
      .post("http://localhost:8080/login", { name: name, pass: pass })
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

function verify(token) {
  return new Promise(function (resolve, reject) {
    axios
      .post("http://localhost:8080/verify", { token: token })
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

function checkAdmin(name) {
  return new Promise(function (resolve, reject) {
    axios
      .post("http://localhost:8080/loadusers", { name: name })
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

function deleteUser(id) {
  return new Promise(function (resolve, reject) {
    axios
      .post("http://localhost:8080/delete", { id: id })
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

function promove(id, perm) {
  return new Promise(function (resolve, reject) {
    axios
      .post("http://localhost:8080/promove", { id: id, perm: perm })
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

function updt_name(id, name) {
  return new Promise(function (resolve, reject) {
    axios
      .post("http://localhost:8080/update/name", { id: id, name: name })
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
function updt_psswd(id, password) {
  return new Promise(function (resolve, reject) {
    axios
      .post("http://localhost:8080/update/password", {
        id: id,
        password: password,
      })
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

function addNote(id, title, content) {
  axios.post("http://localhost:8080/new_note", {
    id: id,
    title: title,
    content: content,
  });
}

function getNotes(id) {
  return new Promise(function (resolve, reject) {
    axios
      .get("http://localhost:8080/notes", { params: { id: id } })
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

function update_note_content(id, content) {
  axios.post("http://localhost:8080/update_note", { id: id, content: content });
}
function update_note_title(id, title) {
  axios.post("http://localhost:8080/update_note", { id: id, content: title });
}

function check_jwt(token) {
  var base64Url = token.split(".")[1];
  if (!base64Url) return "INVALID";
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
  if (!result.name) return "ERROR";
  if (result.perm === 1) return "adm";
  else return "normal";
}

function check_token(token) {
  return new Promise(function (resolve, reject) {
    axios
      .post("http://localhost:8080/token", { token: token })
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

function delete_note(id) {
  axios.post("http://localhost:8080/delete_note", {id: id});
}
export {
  createUser,
  loginUser,
  verify,
  checkAdmin,
  check_jwt,
  deleteUser,
  promove,
  check_token,
  updt_name,
  updt_psswd,
  addNote,
  getNotes,
  update_note_content,
  update_note_title,
  delete_note
};
