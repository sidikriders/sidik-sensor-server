const mongoose = require('mongoose');

const Schema = mongoose.Schema
const Model = mongoose.model

const Area = Model('Area', new Schema({
  name: { type: String, unique: true, required: true }
}))

const Sensor = Model('Sensor', new Schema({
  name: { type: String, required: true },
  area: { type: Schema.Types.ObjectId, ref: 'Area' }
}))

const DataSensor = Model('DataSensor', new Schema({
  value: { type: Number, default: 0 },
  unit: String,
  date: { type: Date, default: Date.now },
  sensor: { type: Schema.Types.ObjectId, ref: 'Sensor' }
}))

module.exports = {
  Area,
  Sensor,
  DataSensor
}