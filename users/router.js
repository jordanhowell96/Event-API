const express = require('express');
const bodyParser = require('body-parser');
const { getAllUsers, addUser } = require('./model');
require('dotenv').config();

const router = express.Router();
router.use(bodyParser.json());

router.get('/', (req, res) => {
    if (!(req.get('Accept').includes("application/json"))) {
        res.status(406).json({"error": "Unsupported MIME Accept type. Valid type: application/json"});
    } else {
        getAllUsers(req)
            .then(users => res.status(200).json(users));
    }
});

router.get('/account', (req, res) => {
    if (req.oidc.isAuthenticated()) {
        addUser(req.oidc)
            .then(res.status(200).send(`Your JWT:<br><br>${req.oidc.idToken}`));
    } else {
        res.status(200).send(`Welcome<br><br><a href="${process.env.BASEURL}/login">Login<a>`);
    }
});

module.exports = router;