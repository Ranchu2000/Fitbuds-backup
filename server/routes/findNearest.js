const express = require('express')
const { restart } = require('nodemon')
const Fcc = require('../models/fccs')
const Gym = require('../models/gyms')
const Park = require('../models/parks')
const User = require('../models/users')
const {Client} = require("@googlemaps/google-maps-services-js");

const router = express.Router()
const client = new Client({});

// fcc
router.get('/fcc', async (req, res) => {
    try {
        const coordinates = await getCoordinates(req.query.address)
        const fccs = await Fcc.find()
        var nearestFcc = {name: '', distance: Infinity}
        for (let i = 0; i<fccs.length; i++){
            var distance = calcDist([fccs[i].latitude, fccs[i].longitude], [coordinates.lat, coordinates.lng])
            if (distance < nearestFcc.distance){
                nearestFcc.name = fccs[i].name
                nearestFcc.distance = distance
            }
        }
        console.log(nearestFcc.name)
        res.json({nearestFcc: nearestFcc.name})
    } catch(e){
        console.log(e);
        res.status(400).send(e.message)
    }
})

// gym and park
router.get('/gym-and-park', async (req, res) => {
    try {
        const coordinates = await getCoordinates(req.query.address)
        const gyms = await Gym.find()
        const parks = await Park.find()
        var nearest = {
            gym: {lat: 0, lng: 0, distance: Infinity},
            park: {lat: 0, lng: 0, distance: Infinity}
        }
        // find gym
        for (let i = 0; i<gyms.length; i++){
            var distance = calcDist([gyms[i].latitude, gyms[i].longitude], [coordinates.lat, coordinates.lng])
            if (distance < nearest.gym.distance){
                nearest.gym.distance = distance
                nearest.gym.lat = gyms[i].latitude
                nearest.gym.lng = gyms[i].longitude
            }
        }
        // find park
        for (let i = 0; i<parks.length; i++){
            var distance = calcDist([parks[i].latitude, parks[i].longitude], [coordinates.lat, coordinates.lng])
            if (distance < nearest.park.distance){
                nearest.park.distance = distance
                nearest.park.lat = parks[i].latitude
                nearest.park.lng = parks[i].longitude
            }
        }

        // get addresses
        gymAddress = await getAddress(nearest.gym.lat, nearest.gym.lng)
        parkAddress = await getAddress(nearest.park.lat, nearest.park.lng)
        res.json({nearestGym: gymAddress, nearestPark: parkAddress})
    } catch(e){
        console.log(e);
        res.status(400).send(e.message)
    }
})

// users
router.get('/users', async (req, res) => {
    try {
        const coordinates = await getCoordinates(req.query.address)
        const users = await User.find()
        var nearestUsers = []
        for (let i = 0; i<users.length; i++){
            const otherUserCoordinates = await getCoordinates(users[i].residentialAddress)
            var distance = calcDist([otherUserCoordinates.lat, otherUserCoordinates.lng], [coordinates.lat, coordinates.lng])
            if(nearestUsers.length < 2){
                nearestUsers.push([users[i].name, distance])
            } else {
                for(let j=nearestUsers.length-1; j >= 0; j--){
                    if(distance < nearestUsers[j][1]){
                        nearestUsers[j][0]=users[i].name
                        nearestUsers[j][1]=distance
                        nearestUsers.sort(function(a, b) {
                            return a[1] - b[1];
                        })
                        break
                    }
                }
            }
            console.log(nearestUsers)
        }
        res.json({nearestUsers: nearestUsers})
    } catch(e){
        console.log(e);
        res.status(400).send(e.message)
    }
})

// common middleware
async function getCoordinates(address){
    try{
        var res = await client.geocode({
            params: {
                key: process.env.GOOGLE_MAPS_API_KEY,
                address: address
            },
            timeout: 3000
        })
        return res.data.results[0].geometry.location;
    } catch(e){
        return Promise.reject(new Error('Failed with ' + e));
    }
}

async function getAddress(lat,lng){
    try{
        var res = await client.reverseGeocode({
            params: {
                key: process.env.GOOGLE_MAPS_API_KEY,
                latlng: [lat, lng] 
            },
            timeout: 3000
        })
        return res.data.results[0].formatted_address;
    } catch(e){
        return Promise.reject(new Error('Failed with ' + e));
    }
}

function calcDist([lat1,lng1],[lat2,lng2]){
    return Math.sqrt(Math.pow(lat1 - lat2,2) + Math.pow(lng1 - lng2,2))
}

module.exports = router
