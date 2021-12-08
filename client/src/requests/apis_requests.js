import axios from 'axios';

const instance = axios.create({
    baseURL: "http://localhost:8080/"
  })

function getSearch(value, token) {
    return new Promise(function (resolve, reject) {
        axios.get('http://localhost:8080/widget/youtube/search?value=' + value, { headers: {'authorization': "Bearer " + token} }).then(res => {
            resolve(res);
        }).catch((err) => setImmediate(() => { reject(err) }))
    })
}
function getWeather(city, token) {
    return new Promise(function (resolve, reject) {
        axios.get('http://localhost:8080/widget/weather/city?city=' + city, {headers: { 'Authorization': 'Bearer ' + token}}).then(res => {
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
    getSearch,
    getProfile,
    getWeather,
    getChannel,
    getCurrency,
    getMoney,
}