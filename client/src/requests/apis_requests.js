import axios from 'axios';

function getWidgets() {
    return new Promise(function (resolve, reject) {
        axios.post('http://localhost:4244/available').then(res => {
            resolve(res);
        }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

function getWeather(data) {
    return new Promise(function (resolve, reject) {
        axios.post('http://localhost:4244/weather', { data }).then(res => {
            resolve(res);
        }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

function getChannel(data) {
    return new Promise(function (resolve, reject) {
        axios.post('http://localhost:4244/youtube', { data }).then(res => {
            resolve(res);
        }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

function getCurrency(data) {
    return new Promise(function (resolve, reject) {
        axios.post('http://localhost:4244/currency', { data }).then(res => {
            resolve(res);
        }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

function getFields(type) {
    return new Promise(function (resolve, reject) {
        axios.post('http://localhost:4244/search/' + type.toLowerCase()).then(res => {
            resolve(res);
        }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

export {
    getWeather,
    getChannel,
    getCurrency,
    getWidgets,
    getFields,
}