"use client";

import { CSSProperties, useEffect, useRef } from "react";

type ParticleFieldProps = {
  count?: number;
  variant?: "fine" | "bokeh";
};

const seeded = (index: number, salt: number) => {
  const value = Math.sin(index * 9301 + salt * 49297) * 233280;
  return value - Math.floor(value);
};

const rounded = (value: number) => Math.round(value * 1000) / 1000;

export function ParticleField({ count = 25, variant = "fine" }: ParticleFieldProps) {
  return (
    <div className={`particle-field particle-field--${variant}`} aria-hidden="true">
      {Array.from({ length: count }, (_, index) => {
        const size = variant === "bokeh" ? 10 + seeded(index, 1) * 14 : 1 + seeded(index, 1) * 5;
        const style: CSSProperties = {
          width: `${rounded(size)}px`,
          height: `${rounded(size)}px`,
          left: `${rounded(seeded(index, 2) * 100)}%`,
          animationDuration: `${rounded(variant === "bokeh" ? 15 + seeded(index, 3) * 10 : 8 + seeded(index, 3) * 16)}s`,
          animationDelay: `${rounded(seeded(index, 4) * -14)}s`,
          filter: `blur(${rounded(variant === "bokeh" ? 2 + seeded(index, 5) * 4 : seeded(index, 5) * 2)}px)`,
        };

        return <span key={index} style={style} />;
      })}
    </div>
  );
}

type Ember = {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  life: number;
  decay: number;
};

export function EmberCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = canvas.getContext("2d");
    const host = canvas.parentElement;
    if (!context || !host) return;

    let frame = 0;
    let particles: Ember[] = [];

    const reset = (particle?: Ember): Ember => {
      const next = particle ?? ({} as Ember);
      next.x = Math.random() * canvas.width;
      next.y = canvas.height + Math.random() * 100;
      next.size = Math.random() * 2.5 + 0.5;
      next.speedY = Math.random() * -1 - 0.5;
      next.speedX = (Math.random() - 0.5) * 0.5;
      next.opacity = Math.random() * 0.5 + 0.1;
      next.life = 1;
      next.decay = Math.random() * 0.005 + 0.002;
      return next;
    };

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const bounds = host.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(bounds.width * ratio));
      canvas.height = Math.max(1, Math.floor(bounds.height * ratio));
      canvas.style.width = `${bounds.width}px`;
      canvas.style.height = `${bounds.height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = bounds.width < 768 ? 30 : 75;
      particles = Array.from({ length: count }, () => reset());
    };

    const draw = () => {
      const bounds = host.getBoundingClientRect();
      context.clearRect(0, 0, bounds.width, bounds.height);

      particles.forEach((particle) => {
        particle.y += particle.speedY;
        particle.x += particle.speedX + Math.sin(particle.y * 0.02) * 0.5;
        particle.life -= particle.decay;

        if (particle.life <= 0 || particle.y < -20) reset(particle);

        const gradient = context.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 4,
        );
        gradient.addColorStop(0, `rgba(255, 200, 100, ${particle.opacity * particle.life})`);
        gradient.addColorStop(0.4, `rgba(201, 154, 69, ${particle.opacity * particle.life * 0.8})`);
        gradient.addColorStop(1, "rgba(201, 154, 69, 0)");
        context.beginPath();
        context.fillStyle = gradient;
        context.arc(particle.x, particle.y, particle.size * 4, 0, Math.PI * 2);
        context.fill();
      });

      frame = window.requestAnimationFrame(draw);
    };

    resize();
    draw();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);

    return () => {
      resizeObserver.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas className="ember-canvas" ref={canvasRef} aria-hidden="true" />;
}
