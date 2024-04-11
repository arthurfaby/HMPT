const { pool } = require('../../database');
const express = require('express'); 
const router = express.Router();
const  cors  = require ('cors')

router.use(cors())
router.use(function(req, res, next) {
    next();
})


router.route('/register').post(function(req, res) {
    console.log(req)
    res.send(200)
})

module.exports = router