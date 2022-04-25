let draw = false
let mouse = {
    x: 0,
    y: 0,
}
let color = '#000'

const canvas = document.querySelector('canvas')
const cx = canvas.getContext('2d')
cx.canvas.width = window.innerWidth
cx.canvas.height = window.innerHeight

const start = (e) => {
    const rect = canvas.getBoundingClientRect()

    if (e.touches) {
        e.preventDefault()

        mouse.x = e.touches[0].pageX - rect.left
        mouse.y = e.touches[0].pageY - rect.top
    } else {
        mouse.x = e.pageX - rect.left
        mouse.y = e.pageY - rect.top
    }

    draw = true

    cx.beginPath()
    cx.moveTo(mouse.x, mouse.y)
}

const painting = (e) => {
    const rect = canvas.getBoundingClientRect()

    if (draw == true) {
        if (e.touches) {
            mouse.x = e.touches[0].pageX - rect.left
            mouse.y = e.touches[0].pageY - rect.top
        } else {
            mouse.x = e.pageX - rect.left
            mouse.y = e.pageY - rect.top
        }

        cx.strokeStyle = color
        cx.lineTo(mouse.x, mouse.y)
        cx.stroke()
    }
}
const stop = (e) => {
    const rect = canvas.getBoundingClientRect()

    if (e.touches) {
        mouse.x = e.touches[0].pageX - rect.left
        mouse.y = e.touches[0].pageY - rect.top
    } else {
        mouse.x = e.pageX - rect.left
        mouse.y = e.pageY - rect.top
    }

    cx.lineTo(mouse.x, mouse.y)
    cx.stroke()
    cx.closePath()
    draw = false
}

canvas.addEventListener('mousedown', start)
canvas.addEventListener('mousemove', painting)
canvas.addEventListener('mouseup', stop)

const save = document.querySelector('#save')
const del = document.querySelector('#del')
const pen = document.querySelector('#pen-color')
const bg_color = document.querySelector('#bg-color')
const range = document.querySelector('input[type=range]')
const img_canvas = document.querySelector('input[type=file]')
const main = document.querySelector('main')
const spinner = document.querySelector('div[role=status]')
const body = document.querySelector('body')

img_canvas.addEventListener('change', ({ target: { files } }) => {
    let img = new Image
    img.src = URL.createObjectURL(files[0])

    main.classList.add('none')
    body.classList.add('b-flex')
    spinner.classList.remove('none')

    img.onload = () => {
        spinner.classList.add('none')
        body.classList.remove('b-flex')
        main.classList.remove('none')
        
        const {width, height} = img
        cx.canvas.width = width
        cx.canvas.height = height

        cx.drawImage(img, 0, 0)
    }
})

save.addEventListener('click', () => {
    const data = canvas.toDataURL('image/png')
    save.href = data.replace(
        /^data:image\/[^;]/,
        'data:application/octet-stream'
    )
})


del.addEventListener('click', () => {
    cx.clearRect(0, 0, canvas.width, canvas.height)
})

pen.addEventListener('change', ({ target: { value } }) => {
    color = value
})

bg_color.addEventListener('change', ({ target: { value } }) => {
    canvas.style.background = value
})

range.addEventListener('input', ({ target: { value } }) => {
    const text_range = document.querySelector('#range_text')
    text_range.innerHTML = value
    cx.lineWidth = value
})

// android
const isTouch = 'ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch || navigator.maxTouchPoints > 0 || window.navigator.msMaxTouchPoints > 0

if (isTouch) {
    canvas.addEventListener('touchstart', start)
    canvas.addEventListener('touchmove', painting)
    canvas.addEventListener('touchend', stop)
}