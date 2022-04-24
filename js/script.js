let draw = false;

const canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const cx = canvas.getContext('2d')

const start = e => {
    draw = true;

    cx.beginPath();
    cx.moveTo(e.pageX, e.pageY);
}
const painting = e => {
    if (draw == true) {
        cx.lineTo(e.pageX, e.pageY);
        cx.stroke();
    }
}
const stop = e => {
    cx.moveTo(e.pageX, e.pageY);
    cx.stroke();
    cx.closePath();
    draw = false;
}

canvas.addEventListener('mousedown', start)
canvas.addEventListener("mousemove", painting)
canvas.addEventListener("mouseup", stop)