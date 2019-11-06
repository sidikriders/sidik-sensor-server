const express = require('express')
const router = express.Router()

const { Area } = require('../models')

// GET ALL AREA
router.get('/', (req, res, next) => {
  Area.find().then(resp => {
    res.send({
      status: true,
      data: resp
    })
  }).catch(err => next(err))
})

// CREATE AREA
router.post('/', (req, res, next) => {
  let area = new Area({ name: req.body.name })

  area.save().then(() => {
    res.send({
      status: true,
      data: area
    })
  }).catch(err => next(err))
})

// GET AREA BY ID
router.get('/:_id', (req, res, next) => {
  Area.findById(req.params._id).then(resp => {
    res.send({
      status: true,
      data: resp
    })
  }).catch(err => next(err))
})

// DELETE AREA BY ID
router.delete('/:_id', (req, res, next) => {
  Area.deleteOne({ _id: req.params._id }).then(() => {
    res.send({
      status: true
    })
  }).catch(err => next(err))
})

// UPDATE AREA BY ID
router.put('/:_id', (req, res, next) => {
  Area.findOneAndUpdate({ _id: req.params._id }, req.body).then(resp => {
    res.send({
      status: true,
      data: resp
    })
  }).catch(err => next(err))
})

module.exports = router