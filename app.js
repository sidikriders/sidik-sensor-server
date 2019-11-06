var express = require('express')
var path = require('path')
var http = require('http')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var debug = require('debug')('sidik-sensor-server:server')
const mongoose = require('mongoose')

const { DB_URL } = require('./app-config')
const route = require('./routes')

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('we\'re connected to database!')
  var app = express()
  
  app.set('port', 3000)
  app.use(express.static(path.join(__dirname, 'assets')))
  app.use(logger('dev'))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(cookieParser())

  // Router
  app.use('/api', route)
  
  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
  })
  
  // error handler
  app.use(function (err, req, res, next) {
    console.log(err)
  
    res.status(err.status || 500)
    res.send(err)
  })


  /**
   * Create HTTP server.
   */

  var server = http.createServer(app)

  /**
   * Listen on provided port, on all network interfaces.
   */

  server.listen(3000)
  server.on('error', onError)
  server.on('listening', function () {
    console.log('listening to port 3000')
  })

  /**
 * Event listener for HTTP server "error" event.
 */

  function onError(error) {
    if (error.syscall !== 'listen') {
      throw error
    }

    var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges')
        process.exit(1)
        break
      case 'EADDRINUSE':
        console.error(bind + ' is already in use')
        process.exit(1)
        break
      default:
        throw error
    }
  }
})

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})