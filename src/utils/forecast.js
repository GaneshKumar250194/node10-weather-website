const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/' + latitude + ',' + longitude

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Api url denied our acces', undefined)
        } else {
            callback(undefined, body)
        }
    })
}

module.exports = forecast