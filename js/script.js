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

pen.addEventListener('change', e => {
   color = e.target.value
})

bg_color.addEventListener('change', e => {
   canvas.style.background = e.target.value
})

range.addEventListener('input', e => {
   const text_range = document.querySelector('#range_text')
   text_range.innerHTML = e.target.value
   cx.lineWidth = e.target.value
})

// android
const isTouch = 'ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch || navigator.maxTouchPoints > 0 || window.navigator.msMaxTouchPoints > 0

if (isTouch) {
   canvas.addEventListener('touchstart', start)
   canvas.addEventListener('touchmove', painting)
   canvas.addEventListener('touchend', stop)

   const nav_btn = document.querySelector('#touch')

   nav_btn.addEventListener('touchmove', () => {
      nav_btn.click()
   })
}
