import axios from 'axios';

function getWeather(data) {
    return new Promise(function (resolve, reject) {
        axios.post('http://localhost:4243/weather', { data }).then(res => {
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
        axios.post('http://localhost:4245/currency', { data }).then(res => {
            resolve(res);
        }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

export {
    getWeather,
    getChannel,
    getCurrency,
}