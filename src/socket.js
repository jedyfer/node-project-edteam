
module.exports = (io) => {
    //  console.log('Archivo de sockets')
    io.on('connection', (socket) => {
        socket.on('drawing', (drawing) => { //  escuchando el evento del cliente
            //  emitiendo el evento show_drawing para los demas usuarios
            io.emit('show_drawing', drawing)
        })
    })
}