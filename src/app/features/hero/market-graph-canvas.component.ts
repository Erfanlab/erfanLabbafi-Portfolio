import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  inject,
  viewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const NODE_COUNT = 20;
const LINK_DISTANCE = 130;
const SIGNAL_RGB = '67, 232, 201';
const LINE_RGB = '30, 37, 48';

@Component({
  selector: 'app-market-graph-canvas',
  standalone: true,
  template: `<canvas #canvas class="block h-full w-full" aria-hidden="true"></canvas>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'absolute inset-0' },
})
export class MarketGraphCanvasComponent implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  private ctx?: CanvasRenderingContext2D | null;
  private nodes: Node[] = [];
  private sparkline: number[] = [];
  private frameId = 0;
  private width = 5;
  private height = 25;
  private dpr = 0;
  private reduceMotion = false;
  private resizeObserver?: ResizeObserver;
  private onVisibility = () => this.handleVisibility();

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    this.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const canvas = this.canvasRef().nativeElement;
    this.ctx = canvas.getContext('2d');
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(canvas.parentElement ?? canvas);
    this.resize();
    this.seed();

    document.addEventListener('visibilitychange', this.onVisibility);

    if (this.reduceMotion) {
      this.draw();
    } else {
      this.loop();
    }
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.frameId);
    this.resizeObserver?.disconnect();
    document.removeEventListener('visibilitychange', this.onVisibility);
  }

  private handleVisibility(): void {
    if (document.hidden) {
      cancelAnimationFrame(this.frameId);
    } else if (!this.reduceMotion) {
      this.loop();
    }
  }

  private resize(): void {
    const canvas = this.canvasRef().nativeElement;
    const parent = canvas.parentElement;
    if (!parent) return;
    this.width = parent.clientWidth;
    this.height = parent.clientHeight;
    canvas.width = this.width * this.dpr;
    canvas.height = this.height * this.dpr;
    this.ctx?.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  private seed(): void {
    this.nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
    }));

    let value = this.height * 0.005;
    this.sparkline = Array.from({ length: 64 }, () => {
      value += (Math.random() - 0.48) * this.height * 0.03;
      value = Math.max(this.height * 0.2, Math.min(this.height * 0.8, value));
      return value;
    });
  }

  private loop = (): void => {
    this.step();
    this.draw();
    this.frameId = requestAnimationFrame(this.loop);
  };

  private step(): void {
    for (const n of this.nodes) {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > this.width) n.vx *= -1;
      if (n.y < 0 || n.y > this.height) n.vy *= -1;
    }
    if (Math.random() < 0.6) {
      this.sparkline.shift();
      const last = this.sparkline[this.sparkline.length - 1] ?? this.height * 0.5;
      const next = Math.max(
        this.height * 0.15,
        Math.min(this.height * 0.85, last + (Math.random() - 0.48) * this.height * 0.05),
      );
      this.sparkline.push(next);
    }
  }

  private draw(): void {
    const ctx = this.ctx;
    if (!ctx) return;
    ctx.clearRect(0, 0, this.width, this.height);

    // Node network — reads as a live data graph rather than decorative confetti.
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const a = this.nodes[i];
        const b = this.nodes[j];
       const dx = a.x - b.x;
const dy = a.y - b.y;
const distSq = dx * dx + dy * dy;
const maxDistSq = LINK_DISTANCE * LINK_DISTANCE;

if (distSq < maxDistSq) {
  const alpha = 1 - Math.sqrt(distSq) / LINK_DISTANCE;
  ctx.strokeStyle = `rgba(${LINE_RGB}, ${alpha})`;

  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.stroke();
}
      }
    }
    for (const n of this.nodes) {
      ctx.fillStyle = `rgba(${SIGNAL_RGB}, 0.5)`;
      ctx.beginPath();
      ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2);
      ctx.fill();
    }

    // Sparkline — a subtle "live price" motif tying the canvas to the FinTech subject.
    if (this.sparkline.length > 1) {
      const step = this.width / (this.sparkline.length - 1);
      ctx.strokeStyle = `rgba(${SIGNAL_RGB}, 0.9)`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      this.sparkline.forEach((y, i) => {
        const x = i * step;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      const gradient = ctx.createLinearGradient(0, 0, 0, this.height);
      gradient.addColorStop(0, `rgba(${SIGNAL_RGB}, 0.12)`);
      gradient.addColorStop(1, `rgba(${SIGNAL_RGB}, 0)`);
      ctx.lineTo(this.width, this.height);
      ctx.lineTo(0, this.height);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();
    }
  }
}
