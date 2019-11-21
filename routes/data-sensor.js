const express = require('express')
const router = express.Router()

const { DataSensor, Sensor } = require('../models')

// GET LATEST DATA SENSOR BY SENSOR
router.get('/:sensorId', async (req, res, next) => {
  try {
    let data = await DataSensor.findOne({ sensor: req.params.sensorId }).sort({ 'date': -1 }).limit(Number(req.query.limit || '1'))
    res.send({
      status: true,
      data
    })
  } catch (error) {
    next(error)
  }
})

// CREATE DATA SENSOR PER SENSOR ID
router.post('/:sensorId', async (req, res, next) => {
  try {
    let _sensor = await Sensor.findById(req.params.sensorId)
    if (_sensor) {
        let newData = new DataSensor({
          value: req.body.value,
          unit: req.body.unit,
          date: new Date(),
          sensor: req.params.sensorId
        })
        try {
          await newData.save()
          res.send({
            status: true,
            data: newData
          })
        } catch (error) {
          next(error)
        }
    } else {
      res.send({
        status: false,
        data: 'sensor id invalid'
      })
    }
  } catch (error) {
    next(error)
  }
})

// GET ALL DATA IN LATEST TWO WEEK
router.get('/summary/:sensorId', (req, res, next) => {
  let lastTwoWeeks = new Date().setDate(new Date().getDate() - 14)

  DataSensor.find({ sensor: req.params.sensorId, date: {
    $gte: new Date(lastTwoWeeks)
  }}, 'value unit date').then(datas => {
    let data = datas.map(({ unit, value, date }) => {
      let wibDate = new Date(date).toLocaleString()
      return {
        unit,
        value,
        date: wibDate
      }
    })
    res.send({
      status: true,
      data
    })
  }).catch(err => next(err))
})

module.exports = router