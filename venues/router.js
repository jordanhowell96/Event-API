const express = require('express');
const { postVenue, getAllVenues, getVenueById, getEventsByVenue, putVenue, patchVenue, 
    deleteVenue, addEventToVenue, removeEventFromVenue } = require('./model.js');
const { jwtMiddleware } = require('../users/jwt.js');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.json());

router.post('/', function (req, res) {
    if (req.get('Content-Type') !== "application/json") {
        res.status(415).json({"error": "Unsupported MIME Content-Type. Valid type: application/json"});
    } else if (!(req.get('Accept').includes("application/json"))) {
        res.status(406).json({"error": "Unsupported MIME Accept type. Valid type: application/json"});
    } else if (req.body.name === undefined || req.body.city === undefined || req.body.type === undefined) {
        res.status(400).json({"error": "The request object is missing at least one of the required attributes"});
    } else if (typeof req.body.name !== "string" || typeof req.body.city !== "string" || typeof req.body.type !== "string") {
        res.status(400).json({"error": "One of the attributes has an incorrect type"});
    } else {
        let url = "https://" + req.get("host") + req.baseUrl + "/";
        postVenue(url, req.body.name, req.body.city, req.body.type)
            .then(venue => res.status(201).json(venue));
    }
});

router.get('/', function (req, res) {
    if (!(req.get('Accept').includes("application/json"))) {
        res.status(406).json({"error": "Unsupported MIME Accept type. Valid type: application/json"});
    } else {
        getAllVenues(req)
            .then(venues => res.status(200).json(venues));
    }
});

router.put('/', function (req, res) {
    res.status(405).json({"error": "PUT requests not allowed at this resource"});
});

router.patch('/', function (req, res) {
    res.status(405).json({"error": "PATCH requests not allowed at this resource"});
});

router.delete('/', function (req, res) {
    res.status(405).json({"error": "DELETE requests not allowed at this resource"});
});

router.get('/:venue_id', function (req, res) {
    if (!(req.get('Accept').includes("application/json"))) {
        res.status(406).json({"error": "Unsupported MIME Accept type. Valid type: application/json"});
    } else {
        let url = "https://" + req.get("host") + req.baseUrl + "/";
        getVenueById(url, req.params.venue_id)
            .then(venue => {
                if (venue == 404) {
                    res.status(404).json({"error": "No venue with this venue_id exists"});
                } else {
                    res.status(200).json(venue)
                }
            });
    }
});

router.put('/:venue_id', function (req, res) {
    if (req.get('Content-Type') !== "application/json") {
        res.status(415).json({"error": "Unsupported MIME Content-Type. Valid type: application/json"});
    } else if (!(req.get('Accept').includes("application/json"))) {
        res.status(406).json({"error": "Unsupported MIME Accept type. Valid type: application/json"});
    } else if (req.body.name === undefined || req.body.city === undefined || req.body.type === undefined) {
        res.status(400).json({"error": "The request object is missing at least one of the required attributes"});
    } else if (typeof req.body.name !== "string" || typeof req.body.city !== "string" || typeof req.body.type !== "string") {
        res.status(400).json({"error": "One of the attributes has an incorrect type"});
    } else {
        let url = "https://" + req.get("host") + req.baseUrl + "/";
        putVenue(url, req.params.venue_id, req.body.name, req.body.city, req.body.type)
            .then(venue => {
                if (venue == 404) {
                    res.status(404).json({"error": "No venue with this venue_id exists"});
                } else {
                    res.status(201).json(venue)
                }
            });
    }
});

router.patch('/:venue_id', function (req, res) {
    if (req.get('Content-Type') !== "application/json") {
        res.status(415).json({"error": "Unsupported MIME Content-Type. Valid type: application/json"});
    } else if (!(req.get('Accept').includes("application/json"))) {
        res.status(406).json({"error": "Unsupported MIME Accept type. Valid type: application/json"});
    } else if ((req.body.name !== undefined && (typeof req.body.name !== "string")) 
            || (req.body.city !== undefined && (typeof req.body.city !== "string"))
            || (req.body.type !== undefined && (typeof req.body.type !== "string"))) {
        res.status(400).json({"error": "One of the attributes has an incorrect type"});
    } else {
        let url = "https://" + req.get("host") + req.baseUrl + "/";
        patchVenue(url, req.params.venue_id, req.body.name, req.body.city, req.body.type)
            .then(venue => {
                if (venue == 404) {
                    res.status(404).json({"error": "No venue with this venue_id exists"});
                } else {
                    res.status(200).json(venue)
                }
            });
    }
});

router.delete('/:venue_id', function (req, res) {
    deleteVenue(req.params.venue_id)
        .then((result) => {
            if (result == 404) {
                res.status(404).json({"error": "No venue with this venue_id exists"});
            } else {
                res.status(204).send();
            }
        });
});

router.post('/:venue_id', function (req, res) {
    res.status(405).json({"error": "POST requests not allowed at this resource"});
});

router.get('/:venue_id/events', function (req, res) {
    if (!(req.get('Accept').includes("application/json"))) {
        res.status(406).json({"error": "Unsupported MIME Accept type. Valid type: application/json"});
    } else {
        let url = "https://" + req.get("host") + req.baseUrl + "/";
        getEventsByVenue(url, req.params.venue_id)
            .then(events => res.status(200).json(events));
    }
});

router.post('/:venue_id/events', function (req, res) {
    res.status(405).json({"error": "POST requests not allowed at this resource"});
});

router.put('/:venue_id/events', function (req, res) {
    res.status(405).json({"error": "PUT requests not allowed at this resource"});
});

router.patch('/:venue_id/events', function (req, res) {
    res.status(405).json({"error": "PATCH requests not allowed at this resource"});
});

router.delete('/:venue_id/events', function (req, res) {
    res.status(405).json({"error": "DELETE requests not allowed at this resource"});
});

router.put('/:venue_id/events/:event_id', jwtMiddleware, function (req, res) {
    if (req.unauthorized) {
        res.status(401).json({"error": "Unauthorized"});
    } else {
        addEventToVenue(req.params.venue_id, req.params.event_id, req.auth.sub)
            .then(status => {
                if (status == 404) {
                    res.status(404).json({"error": "The specified event and/or venue does not exist"});
                } else if (status == 403) {
                    res.status(403).json({"error": "Forbidden"});
                } else {
                    res.status(204).send();
                }
            });
    }
});

router.delete('/:venue_id/events/:event_id', jwtMiddleware, function (req, res) {
    if (req.unauthorized) {
        res.status(401).json({"error": "Unauthorized"});
    } else {
        removeEventFromVenue(req.params.venue_id, req.params.event_id, req.auth.sub)
            .then(status => {
                if (status == 404) {
                    res.status(404).json({"error": "The specified event and/or venue does not exist"});
                } else if (status == 403) {
                    res.status(403).json({"error": "Forbidden"});
                } else {
                    res.status(204).send();
                }
            });
    }
});

router.get('/:venue_id/events/:event_id', function (req, res) {
    res.status(405).json({"error": "GET requests not allowed at this resource"});
});

router.post('/:venue_id/events/:event_id', function (req, res) {
    res.status(405).json({"error": "POST requests not allowed at this resource"});
});

router.patch('/:venue_id/events/:event_id', function (req, res) {
    res.status(405).json({"error": "PATCH requests not allowed at this resource"});
});


module.exports = router;