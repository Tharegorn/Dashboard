import axios from 'axios';

function getWidgets() {
    return new Promise(function (resolve, reject) {
        axios.post('http://localhost:4244/available').then(res => {
            resolve(res);
        }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

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
    getWidgets,
    getFields,
}