import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-firework',
  templateUrl: './firework.component.html',
  styleUrls: ['./firework.component.less']
})
export class FireworkComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const ctx = document.querySelector('canvas').getContext('2d')
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    const sparks = [];
    const fireworks = [];
    let i = 20; while (i--) {
      fireworks.push(
        new Firework(Math.random() * window.innerWidth, window.innerHeight * Math.random())
      )
    }

    render()
    function render() {
      setTimeout(render, 1000 / 60)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      for (const firework of fireworks) {
        if (firework.dead) continue
        firework.move()
        firework.draw()
      }
      for (const spark of sparks) {
        if (spark.dead) continue
        spark.move()
        spark.draw()
      }

      if (Math.random() < 0.05) {
        fireworks.push(new Firework())
      }
    }

    function Spark(x, y, color) {
      this.x = x
      this.y = y
      this.dir = Math.random() * (Math.PI * 2)
      this.dead = false
      this.color = color
      this.speed = Math.random() * 3 + 3;
      this.walker = new Walker({ radius: 20, speed: 0.25 })
      this.gravity = 0.25
      this.dur = this.speed / 0.1
      this.move = function () {
        this.dur--
        if (this.dur < 0) this.dead = true

        if (this.speed < 0) return
        if (this.speed > 0) this.speed -= 0.1
        const walk = this.walker.step()
        this.x += Math.cos(this.dir + walk) * this.speed
        this.y += Math.sin(this.dir + walk) * this.speed
        this.y += this.gravity
        this.gravity += 0.05

      }
      this.draw = function () {
        drawCircle(this.x, this.y, 3, this.color)
      }
    }

    function Firework(x?, y?) {
      this.xmove = new Walker({ radius: 10, speed: 0.5 })
      this.x = x || Math.random() * ctx.canvas.width
      this.y = y || ctx.canvas.height
      this.height = Math.random() * ctx.canvas.height / 2
      this.dead = false
      this.color = randomColor()

      this.move = function () {
        this.x += this.xmove.step()
        if (this.y > this.height) this.y -= 1;
        else this.burst()

      }
      this.draw = function () {
        drawCircle(this.x, this.y, 1, this.color)
      }
      this.burst = function () {
        this.dead = true
        let i = 100; while (i--) sparks.push(new Spark(this.x, this.y, this.color))
      }
    }

    function drawCircle(x, y, radius, color) {
      color = color || '#FFF'
      ctx.fillStyle = color
      ctx.fillRect(x - radius / 2, y - radius / 2, radius, radius)
    }

    function randomColor() {
      return ['#FF3B30', '#88e3b2', '#F95E5A', '#7bd7ec', '#48D863'][Math.floor(Math.random() * 5)];
    }

    function Walker(options) {
      this.step = function () {
        this.direction = Math.sign(this.target) * this.speed
        this.value += this.direction
        this.target
          ? this.target -= this.direction
          : (this.value)
            ? (this.wander)
              ? this.target = this.newTarget()
              : this.target = -this.value
            : this.target = this.newTarget()
        return this.direction
      }

      this.newTarget = function () {
        return Math.round(Math.random() * (this.radius * 2) - this.radius)
      }

      this.start = 0
      this.value = 0
      this.radius = options.radius
      this.target = this.newTarget()
      this.direction = Math.sign(this.target)
      this.wander = options.wander
      this.speed = options.speed || 1
    }
  }

}
