const express = require('express')
const router = express.Router()

const area = require('./area')
const sensor = require('./sensor')

router.use('/area', area)
router.use('/sensor', sensor)

module.exports = router