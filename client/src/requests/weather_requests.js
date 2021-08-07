import axios from 'axios';

function getWeather() {
    return new Promise(function (resolve, reject) {
        axios.post('http://localhost:4243/weather', {}).then(res => {
            resolve(res);
        }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

export {
    getWeather,
}