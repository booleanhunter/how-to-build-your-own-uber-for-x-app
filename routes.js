const express = require('express');
const router = express.Router();

const dbOperations = require('./db/db-operations');

// request to /civilian.html?userId=ashwin will render our civilian.html page
router.get('/civilian.html', (req, res) => {
    res.render('civilian.html', {
        userId: req.query.userId
    });
});

router.get('/cop.html', (req, res) => {
    res.render('cop.html', {
        userId: req.query.userId
    });
});

router.get('/data.html', (req, res) => {
    res.render('data.html');
});

router.get('/cops', async (req, res) => {
    /*
        extract the latitude and longitude info from the request query params.
        Then, fetch the nearest cops using MongoDB's geospatial queries and return it back to the client.
    */
    const latitude = Number(req.query.lat);
    const longitude = Number(req.query.lng);
    const nearestCops = await dbOperations.fetchNearestCops([longitude, latitude], 2000);

    res.json({
        cops: nearestCops
    });
});

router.get('/cops/info', async (req, res) => {
    const userId = req.query.userId // xtract userId from query params
    const copDetails = await dbOperations.fetchCopDetails(userId);

    res.json({
        copDetails: copDetails
    });
});

// fetch all requests
router.get('/requests/info', async (req, res) => {
    const results = await dbOperations.fetchRequests();
    const features = [];

    for (let i = 0; i < results.length; i++) {
        features.push({
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: results[i].location.coordinates
            },
            properties: {
                status: results[i].status,
                requestTime: results[i].requestTime,
                address: results[i].location.address
            }
        });
    }

    const geoJsonData = {
        type: 'FeatureCollection',
        features: features
    }

    res.json(geoJsonData);
});

module.exports = router;