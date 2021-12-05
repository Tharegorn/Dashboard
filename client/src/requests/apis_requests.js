import axios from 'axios';

function getWeather(city) {
    return new Promise(function (resolve, reject) {
        axios.post('http://localhost:4244/weather', {city: city}).then(res => {
            resolve(res);
        }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

function getChannel(channel, token) {
    return new Promise(function (resolve, reject) {
        axios.get('http://localhost:8080/widget/youtube/channel?channel=' + channel, { headers: {'authorization': "Bearer " + token} }).then(res => {
            resolve(res);
        }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

function getMoney(token) {
    return new Promise(function (resolve, reject) {
        axios.get('http://localhost:8080/widget/currency/values', {headers: { 'Authorization': 'Bearer ' + token}}).then(res => {
            resolve(res);
        }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

function getCurrency(from, to, value, token) {
    return new Promise(function (resolve, reject) {
        axios.get('http://localhost:8080/widget/currency/exchange?from=' + from + '&to=' + to + '&value=' + value, {headers: { 'Authorization': 'Bearer ' + token}}).then(res => {
            resolve(res);
        }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

function getProfile(token) {
    return new Promise(function (resolve, reject) {
        axios.get('http://localhost:8080/epitech/profile', {headers: {'Authorization': "Bearer " + token}}).then(res => {
            resolve(res);
        }).catch((err) => setImmediate(() => { reject(err) }))
    })
}


export {
    getProfile,
    getWeather,
    getChannel,
    getCurrency,
    getMoney,
}