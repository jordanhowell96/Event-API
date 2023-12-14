const express = require('express');
const { postEvent, getAllEvents, getEventsByHost, getEventById, putEvent, patchEvent, deleteEvent } = require('./model.js');
const { jwtMiddleware } = require('../users/jwt.js');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.json());

router.post('/', jwtMiddleware, function (req, res) {
    if (req.unauthorized) {
        res.status(401).json({"error": "Unauthorized"});
    } else if (req.get('Content-Type') !== "application/json") {
        res.status(415).json({"error": "Unsupported MIME Content-Type. Valid type: application/json"});
    } else if (!(req.get('Accept').includes("application/json"))) {
        res.status(406).json({"error": "Unsupported MIME Accept type. Valid type: application/json"});
    } else if (req.body.name === undefined || req.body.date === undefined) {
        res.status(400).json({"error": "The request object is missing at least one of the required attributes"});
    } else if (typeof req.body.name !== "string" || typeof req.body.date !== "string" || (typeof req.body.description !== "string" && req.body.description !== undefined)) {
        res.status(400).json({"error": "One of the attributes has an incorrect type"});
    } else {
        let url = "https://" + req.get("host") + req.baseUrl + "/";
        postEvent(url, req.body.name, req.body.date, req.body.description ? req.body.description : "", req.auth.sub)
            .then(event => res.status(201).json(event));
    }
});

router.get('/', jwtMiddleware, function (req, res) {
    if (!(req.get('Accept').includes("application/json"))) {
        res.status(406).json({"error": "Unsupported MIME Accept type. Valid type: application/json"});
    } else if (req.unauthorized) {
        getAllEvents(req)
            .then(events => res.status(200).json(events));
    } else {
        getEventsByHost(req, req.auth.sub)
            .then(events => res.status(200).json(events));
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

router.get('/:event_id', function (req, res) {
    if (!(req.get('Accept').includes("application/json"))) {
        res.status(406).json({"error": "Unsupported MIME Accept type. Valid type: application/json"});
    } else {
        let url = "https://" + req.get("host") + req.baseUrl + "/";
        getEventById(url, req.params.event_id)
            .then(event => {
                if (event == 404) {
                    res.status(404).json({"error": "No event with this event_id exists"});
                } else {
                    res.status(200).json(event)
                }
            });
    }
});

router.put('/:event_id', jwtMiddleware, function (req, res) {
    if (req.unauthorized) {
        res.status(401).json({"error": "Unauthorized"});
    } else if (req.get('Content-Type') !== "application/json") {
        res.status(415).json({"error": "Unsupported MIME Content-Type. Valid type: application/json"});
    } else if (!(req.get('Accept').includes("application/json"))) {
        res.status(406).json({"error": "Unsupported MIME Accept type. Valid type: application/json"});
    } else if (req.body.name === undefined || req.body.date === undefined) {
        res.status(400).json({"error": "The request object is missing at least one of the required attributes"});
    } else if (typeof req.body.name !== "string" || typeof req.body.date !== "string" 
            || (typeof req.body.description !== "string" && req.body.description !== undefined)) {
        res.status(400).json({"error": "One of the attributes has an incorrect type"});
    } else {
        let url = "https://" + req.get("host") + req.baseUrl + "/";
        putEvent(url, req.params.event_id, req.body.name, req.body.date, req.body.description ? req.body.description !== undefined : "", req.auth.sub)
            .then(event => {
                if (event == 404) {
                    res.status(404).json({"error": "No event with this event_id exists"});
                } else if (event == 403) {
                    res.status(403).json({"error": "Forbidden"});
                } else {
                    res.status(201).json(event)
                }
            });
    }
});

router.patch('/:event_id', jwtMiddleware, function (req, res) {
    if (req.unauthorized) {
        res.status(401).json({"error": "Unauthorized"});
    } else if (req.get('Content-Type') !== "application/json") {
        res.status(415).json({"error": "Unsupported MIME Content-Type. Valid type: application/json"});
    } else if (!(req.get('Accept').includes("application/json"))) {
        res.status(406).json({"error": "Unsupported MIME Accept type. Valid type: application/json"});
    } else if ((req.body.name !== undefined && (typeof req.body.name !== "string")) 
            || (req.body.date !== undefined && (typeof req.body.date !== "string"))
            || (req.body.description !== undefined && (typeof req.body.description !== "string"))) {
        res.status(400).json({"error": "One of the attributes has an incorrect type"});
    } else {
        let url = "https://" + req.get("host") + req.baseUrl + "/";
        patchEvent(url, req.params.event_id, req.body.name, req.body.date, req.body.description, req.auth.sub)
            .then(event => {
                if (event == 404) {
                    res.status(404).json({"error": "No event with this event_id exists"});
                } else if (event == 403) {
                    res.status(403).json({"error": "Forbidden"});
                } else {
                    res.status(200).json(event)
                }
            });
    }
});

router.delete('/:event_id', jwtMiddleware, function (req, res) {
    if (req.unauthorized) {
        res.status(401).json({"error": "Unauthorized"});
    } else {
        deleteEvent(req.params.event_id, req.auth.sub)
            .then((status) => {
                if (status == 404) {
                    res.status(404).send({"error": "No event with this event_id exists"});
                } else if (status == 403) {
                    res.status(403).json({"error": "Forbidden"});
                } else {
                    res.status(204).send();
                }
            });
    }
});

router.post('/:event_id', function (req, res) {
    res.status(405).json({"error": "POST requests not allowed at this resource"});
});

module.exports = router;