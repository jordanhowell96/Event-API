const { expressjwt: jwt } = require('express-jwt');
const jwksRsa = require('jwks-rsa');
require('dotenv').config();

// JWT Middleware ////////////////////////////////////////

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${process.env.DOMAIN}/.well-known/jwks.json`
    }),
  
    // Validate the audience and the issuer.
    issuer: `https://${process.env.DOMAIN}/`,
    algorithms: ['RS256'],
  });

function jwtMiddleware(req, res, next) {
    checkJwt(req, res, (err) => {
        if (err && err.name === 'UnauthorizedError') {
            req.unauthorized = true;
        }
        next(); 
    });
}

exports.jwtMiddleware = jwtMiddleware;