
module.exports = (io) => {
    let data = []

    //  para ver en numero de usuarios conectados
    let users = 0

    //  console.log('Archivo de sockets')
    io.on('connection', (socket) => {   
        for (let i = 0; i < data.length; i++) {
            //  enviando cada dibujo para que sea visible por usuarios que recien se conecten
            io.emit('show_drawing', data[i])
        }

        //  incrementa cada que un usuario se conecte
        users += 1
        io.emit('users', users)

        //  escuchamos el evento del cliente
        socket.on('delete', () => {
            //  vaciamos el arreglo
            data = []
            //  limpiamos los datos 
            io.emit('show_drawing', null)
        })

        socket.on('drawing', (drawing) => { //  escuchando el evento del cliente
            //  almacenando el dibujo dentro del array
            data.push(drawing)

            //  emitiendo el evento show_drawing para los demas usuarios
            io.emit('show_drawing', drawing)
        })

        socket.on('disconnect', () => {
            //  dismuir usuarios al desconectarse
            users -= 1
            io.emit('users', users)
        })
    })
}