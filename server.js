const express = require('express');
const { auth } = require('express-openid-connect');
require('dotenv').config()

const app = express();

const config = {
    authRequired: false,
    auth0Logout: true,
    baseURL: process.env.BASEURL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: `https://${process.env.DOMAIN}`,
    secret: process.env.CLIENT_SECRET
};

app.use(auth(config));

app.use('/', require('./index'));

app.get('/', (req, res) => {
    res.redirect("/users/account");
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
