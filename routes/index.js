const express = require('express')
const router = express.Router()

const area = require('./area')

router.use('/area', area)

module.exports = router