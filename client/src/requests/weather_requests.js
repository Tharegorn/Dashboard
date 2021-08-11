import axios from 'axios';

function getWeather(data) {
    return new Promise(function (resolve, reject) {
        axios.post('http://localhost:4243/weather', {data}).then(res => {
            resolve(res);
        }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

export {
    getWeather,
}