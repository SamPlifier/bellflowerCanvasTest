const canvas = document.querySelector('canvas');
let width = window.innerWidth -20;
let height = window.innerHeight -20;
canvas.width = width;
canvas.height = height;

const c = canvas.getContext('2d');

// c.fillStyle = 'rgba(255,0,0, .1)';
// c.fillRect(0, 0, 50, 50);
// c.fillStyle = 'rgba(0,0,255, .1)';
// c.fillRect(60, 60, 50, 50);
// c.fillRect(100, 100, 70, 70);

// Lines
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = 'blue';
// c.stroke();


// Arcs/Circles
// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI * 2, false);
// c.strokeStyle = 'green';
// c.fillStyle = 'black';
// c.fill();
// c.stroke();

// for (let i = 0; i < 10; i++) {
//     const x = Math.random() * window.innerWidth;
//     const y = Math.random() * window.innerHeight;
//     c.beginPath();
//     c.arc(x, y, 30, 0, Math.PI * 2, false);
//     c.strokeStyle = 'green';
//     c.stroke();
//     c.fillStyle = 'black';
//     c.fill();
// }

// c.beginPath();
// c.arc(200, 200, 30, 0, Math.PI * 2, false);
// c.strokeStyle = 'green';
// c.stroke();
const mouse = {
    x: null,
    y: null
}
const colors = [
    '#07393C',
    '#2C666E',
    '#90DDF0'
]
window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});
function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.maxRadius = 30;
    this.minRadius = 3;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }
    this.update = function() {
        if (this.x + this.radius > width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        if (Math.abs(mouse.x - this.x) < 30 && Math.abs(mouse.y - this.y) < 30) {
            if (this.radius < this.maxRadius) {
                this.radius += .2;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= .2;
        }
        this.draw();
    }
}
circleArray = [];

for (let i = 0; i < 100; i++) {
    let radius = Math.random() * 3 + 1;
    let x = Math.random() * (width - radius * 2) + radius;
    let y = Math.random() * (height - radius * 2) + radius;
    let dx = Math.random() - .5;
    let dy = Math.random() - .5;
    circleArray.push(new Circle(x, y, dx, dy, radius));
}
const animate = () => {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, width, height);
    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}
animate();