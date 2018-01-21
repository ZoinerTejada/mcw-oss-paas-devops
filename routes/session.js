var express = require('express');
var router = express.Router();

/* Get single Order by id */
router.get('/', function(req, res, next) {
    if(req.session && req.session.user) {
        res.json(req.session.user);
    }
    else {
        res.json({
            "message":"No user logged in. Need to redirect to login page."
        });
    }
});

module.exports = router;