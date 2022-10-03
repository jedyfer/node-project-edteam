const express = require('express')
const http = require('http')    //  servidor para el socket
const path = require('path')
const sockeio = require('socket.io')

//  para que heroku no bloquee el acceso a los sockets
const cors = require('cors')

//  server con express
const app = express()
//  server con http
const server = http.createServer(app)

//  importando socket
const io = sockeio(server)
require('./socket')(io)

//  MODIFICAMOS EL PUERTO
app.set('port', process.env.PORT || 5000)   //  significa que si heroku tiene una var. de entorno que use eso

//  middleware
app.use(express.static(path.join(__dirname, 'public'))) //  acceso a mis archivos html css js

//  middleware para cors
app.use(cors())

server.listen(app.get('port'), () => {
    console.log('App corriendo en el puerto ' + app.get('port'))
})


