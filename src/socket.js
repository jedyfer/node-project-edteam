
module.exports = (io) => {
    data = []

    //  console.log('Archivo de sockets')
    io.on('connection', (socket) => {   
        for (let i = 0; i < data.length; i++) {
            //  enviando cada dibujo para que sea visible por usuarios que recien se conecten
            io.emit('show_drawing', data[i])
        }

        socket.on('drawing', (drawing) => { //  escuchando el evento del cliente
            //  almacenando el dibujo dentro del array
            data.push(drawing)

            //  emitiendo el evento show_drawing para los demas usuarios
            io.emit('show_drawing', drawing)
        })
    })
}