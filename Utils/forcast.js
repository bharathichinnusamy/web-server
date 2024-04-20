const request = require('request')


const forecast = (lat, long, callback) => {
    const url = "http://api.weatherapi.com/v1/current.json?key=0f5cfabc379c4d81b38180351241204&q=" + lat + "," + long
    request({ url, json: true }, (error, {body}={}) => {
        if (error) {
            callback("unable to connet to weather service", undefined)
        } else if (body.error) {
            callback("unable to find location", undefined)

        } else {
            callback(undefined,body.current.condition.text + ". " + "it ia currently" + " " + body.current.temp_f + " " + "degrees out. " + "it feels like" + " " + body.current.feelslike_f + " " + "degrees out.")
        }

    })
}


module.exports = forecast