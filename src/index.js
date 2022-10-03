const express = require('express')
const http = require('http')    //  servidor para el socket
const path = require('path')
const sockeio = require('socket.io')

//  server con express
const app = express()
//  server con http
const server = http.createServer(app)

//  importando socket
const io = sockeio(server)
require('./socket')(io)

app.set('port', 3000)

//  middleware
app.use(express.static(path.join(__dirname, 'public'))) //  acceso a mis archivos html css js

app.listen(app.get('port'), () => {
    console.log('App corriendo en el puerto ' + app.get('port'))
})

