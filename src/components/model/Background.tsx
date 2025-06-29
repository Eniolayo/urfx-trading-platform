import { useEffect, useRef } from "react";

const Background = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationFrameId: number;

    const Particles: Particle[] = [];
    let time = 0;

    const deg = (a: number) => (Math.PI / 180) * a;
    const rand = (v1: number, v2: number) =>
      Math.floor(v1 + Math.random() * (v2 - v1));

    const opt = {
      particles: window.innerWidth > 500 ? 100 : 50,
      noiseScale: 0.009,
      angle: (Math.PI / 180) * -90,
      h1: rand(0, 360),
      h2: rand(0, 360),
      s1: rand(20, 90),
      s2: rand(20, 90),
      l1: rand(30, 80),
      l2: rand(30, 80),
      strokeWeight: 4,
      tail: 10, // Increase this value to make the tail longer
    };

    class Particle {
      x: number;
      y: number;
      lx: number;
      ly: number;
      vx: number;
      vy: number;
      ax: number;
      ay: number;
      hueSemen: number;
      hue: number;
      sat: number;
      light: number;
      maxSpeed: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.lx = x;
        this.ly = y;
        this.vx = 0;
        this.vy = 0;
        this.ax = 0;
        this.ay = 0;
        this.hueSemen = Math.random();
        this.hue = this.hueSemen > 0.5 ? 20 + opt.h1 : 20 + opt.h2;
        this.sat = this.hueSemen > 0.5 ? opt.s1 : opt.s2;
        this.light = this.hueSemen > 0.5 ? opt.l1 : opt.l2;
        this.maxSpeed = this.hueSemen > 0.5 ? 1.5 : 0.7;
      }

      randomize() {
        this.hueSemen = Math.random();
        this.hue = this.hueSemen > 0.5 ? 20 + opt.h1 : 20 + opt.h2;
        this.sat = this.hueSemen > 0.5 ? opt.s1 : opt.s2;
        this.light = this.hueSemen > 0.5 ? opt.l1 : opt.l2;
        this.maxSpeed = this.hueSemen > 0.5 ? 1.5 : 0.7;
      }

      update() {
        this.follow();
        this.vx += this.ax;
        this.vy += this.ay;
        const p = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        const a = Math.atan2(this.vy, this.vx);
        const m = Math.min(this.maxSpeed, p);
        this.vx = Math.cos(a) * m;
        this.vy = Math.sin(a) * m;
        this.x += this.vx;
        this.y += this.vy;
        this.ax = 0;
        this.ay = 0;
        this.edges();
      }

      follow() {
        const angle =
          this.noise() *
            Math.PI *
            0.5 +
          opt.angle;
        this.ax += Math.cos(angle);
        this.ay += Math.sin(angle);
      }

      noise() {
        return Math.random();
      }

      updatePrev() {
        this.lx = this.x;
        this.ly = this.y;
      }

      edges() {
        if (!canvas) return;
        if (this.x < 0) {
          this.x = canvas.width;
          this.updatePrev();
        }
        if (this.x > canvas.width) {
          this.x = 0;
          this.updatePrev();
        }
        if (this.y < 0) {
          this.y = canvas.height;
          this.updatePrev();
        }
        if (this.y > canvas.height) {
          this.y = 0;
          this.updatePrev();
        }
      }

      render() {
        if (!ctx) return;
        ctx.strokeStyle = `hsla(${this.hue}, ${this.sat}%, ${this.light}%, .5)`;
        ctx.lineWidth = opt.strokeWeight;
        ctx.beginPath();
        ctx.moveTo(this.lx, this.ly);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
        this.updatePrev();
      }
    }

    const setup = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      for (let i = 0; i < opt.particles; i++) {
        Particles.push(
          new Particle(
            Math.random() * canvas.width,
            Math.random() * canvas.height
          )
        );
      }
    };

    const draw = () => {
      time++;
      ctx.fillStyle = `rgba(0, 0, 0, ${1 - opt.tail / 100})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (const particle of Particles) {
        particle.update();
        particle.render();
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleClick = () => {
      opt.h1 = rand(0, 360);
      opt.h2 = rand(0, 360);
      opt.s1 = rand(20, 90);
      opt.s2 = rand(20, 90);
      opt.l1 = rand(30, 80);
      opt.l2 = rand(30, 80);
      opt.angle += deg(rand(60, 60)) * (Math.random() > 0.5 ? 1 : -1);

      for (let p of Particles) {
        p.randomize();
      }
    };

    setup();
    draw();
    window.addEventListener("resize", handleResize);
    document.body.addEventListener("click", handleClick);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      document.body.removeEventListener("click", handleClick);
    };
  }, []);

  return <canvas className="top-0 fixed" ref={canvasRef}></canvas>;
};

export default Background;
