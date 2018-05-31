var express = require('express')
var path = require('path')

var app = express()
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist'))
})

var port = process.env.PORT || 5000
app.listen(port)
console.log('server started ' + port)
