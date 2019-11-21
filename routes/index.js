const express = require('express')
const router = express.Router()

const area = require('./area')
const sensor = require('./sensor')
const dataSensor = require('./data-sensor')

router.use('/area', area)
router.use('/sensor', sensor)
router.use('/data', dataSensor)

module.exports = router