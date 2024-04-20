const request = require('request')

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoibGNzYmhhcmF0aGkiLCJhIjoiY2x2MTNkeHJtMDJ2dDJqdDR2cmVtcXp6cyJ9.z4BJ2VRbTU6gLG7faOgXTA&limit=1"
    request({ url, json: true }, (error, { body }={}) => {
        if (error) {
            callback('unable to connect location services', undefined)
        } else if (body.features.length === 0) {
            callback('unable to find the location', undefined)

        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }

    })
}

module.exports = geocode