import axios from 'axios';

function createUser(name, pass) {
    return new Promise(function (resolve, reject) {
        axios.post('http://localhost:4242/register', { name: name, pass: pass }).then(res => {
            resolve(res)
        }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

function loginUser(name, pass) {
    return new Promise(function (resolve, reject) {
        axios.post('http://localhost:4242/login', { name: name, pass: pass }).then(res => {
            resolve(res)
        }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

function verify(token) {
    return new Promise(function (resolve, reject) {
        axios.post('http://localhost:4242/verify', { token: token }).then(res => {
            resolve(res)
        }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

function checkAdmin(name) {
    return new Promise(function (resolve, reject) {
        axios.post('http://localhost:4242/loadusers', { name: name }).then(res => {
            resolve(res)
        }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

function deleteUser(id) {
    return new Promise(function (resolve, reject) {
        axios.post('http://localhost:4242/delete', { id: id }).then(res => {
            resolve(res)
        }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

function promove(id, perm) {
    return new Promise(function (resolve, reject) {
        axios.post('http://localhost:4242/promove', { id: id, perm: perm }).then(res => {
            resolve(res)
        }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

function check_jwt(token) {
    var base64Url = token.split('.')[1];
    if (!base64Url) return ("INVALID");
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    var result = JSON.parse(jsonPayload)
    if (!result.name)
        return ("ERROR")
    if (result.perm === 1)
        return ("adm")
    else
        return ("normal");
}

function check_token(token) {
    return new Promise(function (resolve, reject) {
        axios.post('http://localhost:4242/token', { token: token}).then(res => {
            resolve(res)
        }).catch((err) => setImmediate(() => { reject(err) }))
    })
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
}