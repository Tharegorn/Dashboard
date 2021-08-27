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

function checkAdmin(token) {
    return new Promise(function (resolve, reject) {
        axios.post('http://localhost:4242/adminLoadUsers', { token: token }).then(res => {
            resolve(res)
        }).catch((err) => setImmediate(() => { reject(err) }))
    })
}
export {
    createUser,
    loginUser,
    verify,
    checkAdmin,
}