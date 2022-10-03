//  socket en el cliente
const socket = io()

let click = false
let moving_mouse = false
let x_position = 0
let y_position = 0
let previous_position = { x_position: 0, y_position: 0 }    //  canvas requiere una posicion inicial
let color = 'black'

const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

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
