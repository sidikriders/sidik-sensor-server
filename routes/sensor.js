const express = require('express')
const router = express.Router()

const { Area, Sensor } = require('../models')

// GET ALL SENSOR
router.get('/', (req, res, next) => {
  Sensor.find().exec((err, resp) => {
    if (err) return next(err)
    res.send({
      status: true,
      data: resp
    })
  })
})

// CREATE SENSOR
router.post('/', async (req, res, next) => {
  let area = await Area.findById(req.body.area)
  if (area) {
    let sensor = new Sensor(req.body)
    try {
      await sensor.save()
    } catch (error) {
      return next(error)
    }
    res.send({
      status: true,
      data: sensor
    })
  } else {
    next({
      msg: 'Area Id is invalid'
    })
  }
})

// GET SENSOR BY ID
router.get('/:_id', (req, res, next) => {
  Sensor.findById(req.params._id).populate('area').then(resp => {
    res.send({
      status: true,
      data: resp
    })
  }).catch(err => next(err))
})

// GET SENSOR BY AREA ID
router.get('/area/:_id', async (req, res, next) => {
  try {
    let area = await Area.findById(req.params._id).exec()
    let sensors = await Sensor.find({ area: req.params._id })

    res.send({
      status: true,
      data: {
        area,
        sensors
      }
    })
  } catch (error) {
    next(error)
  }
})

// DELETE SENSOR BY ID
router.delete('/:_id', (req, res, next) => {
  Sensor.deleteOne({ _id: req.params._id }).then(() => {
    res.send({
      status: true
    })
  }).catch(err => next(err))
})

// UPDATE SENSOR BY ID
router.put('/:_id', (req, res, next) => {
  Sensor.findOneAndUpdate({ _id: req.params._id }, req.body).exec((err, resp) => {
    if (err) return next(err)
    res.send({
      status: true,
      data: resp
    })
  })
})

module.exports = router