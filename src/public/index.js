//  socket en el cliente
const socket = io()

let click = false
let moving_mouse = false
let x_position = 0
let y_position = 0
let previous_position = null    //  canvas requiere una posicion inicial
let color = 'black'

const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

//  users
const users = document.getElementById('users')

const width = window.innerWidth //  ancho del navegador
const height = window.innerHeight   //  alto

//  dimensiones de canvas
canvas.width = width
canvas.height = height

//  eventos
//  cuando se pulse dentro del contendedor de canvas
canvas.addEventListener('mousedown', () => {
    //  console.log('Esta pulsando el click')

    click = true
})

//  cuando se termine la pulsacion del mouse
canvas.addEventListener('mouseup', () => {
    //  console.log('Solto el click')

    click = false
})

//  cuando se mueve el mouse por la pantalla
canvas.addEventListener('mousemove', (e) => {
    //  e: muestra la posicion en x - y
    //  console.log(e)

    x_position = e.clientX
    y_position = e.clientY

    moving_mouse = true
})

//  PARA CAMBIAR EL COLOR
function change_color(c) {
    color = c

    context.strokeStyle = color //  color de la linea

    //  necesario para que actualice los cambios
    context.stroke() 
}

const delete_all = () => {
    //  emitimos un evento al servidor
    socket.emit('delete')
}

function create_drawing() {
    if (click && moving_mouse && previous_position != null) {
        let drawing = {
            x_position,
            y_position,
            color,
            previous_position
        }

        //  show_drawing(drawing)

        //  CREACION DE SOCKETS para que sea visible por los demas usuarios
        socket.emit('drawing', drawing)
    }

    previous_position = { x_position, y_position }  //  iguala a x_position: x_position

    //  ejecucion en cada cierto tiempo
    setTimeout(create_drawing, 25)
}

/* escuchando el evento de socket.js */
socket.on('show_drawing', (drawing) => {    //  obtiene drawing del evento
    if (drawing != null) {
        //  para dibujar
        context.beginPath()
        context.lineWidth = 3   //  grosor de linea
        context.strokeStyle = drawing.color //  color de la linea
        context.moveTo(drawing.x_position, drawing.y_position)  //  posicion final
        context.lineTo(drawing.previous_position.x_position, drawing.previous_position.y_position)  //  posicion inicial
        context.stroke()    //  para dibujar el trazo
    } else {
        //  esto es para limpiar el canvas
        context.clearRect(0, 0, canvas.width, canvas.height)
    }
})

//  cliente escuchando evento del servidor
socket.on('users', (number) => {
    users.innerHTML = `Número de usuarios conectados: ${number}`
})

/* esto era para pruebas */
/* function show_drawing(drawing) {
    //  para dibujar

    context.beginPath()
    context.lineWidth = 3   //  grosor de linea
    context.strokeStyle = drawing.color //  color de la linea
    context.moveTo(drawing.x_position, drawing.y_position)  //  posicion final
    context.lineTo(drawing.previous_position.x_position, drawing.previous_position.y_position)  //  posicion inicial
    context.stroke()    //  para dibujar el trazo
} */

create_drawing()    //  llamamos a la funcion