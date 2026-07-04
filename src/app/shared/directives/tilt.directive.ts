import { Directive, ElementRef, HostListener, Input, OnInit, inject } from '@angular/core';
import { GsapService } from '../../core/services/gsap.service';

@Directive({
  selector: '[appTilt]',
  standalone: true,
  host: { style: 'transform-style: preserve-3d; will-change: transform;' },
})
export class TiltDirective implements OnInit {
  @Input() appTiltMax = 8;

  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly gsapService = inject(GsapService);
  private quickRotateX?: (v: number) => void;
  private quickRotateY?: (v: number) => void;
  private reduceMotion = false;

  ngOnInit(): void {
    if (!this.gsapService.isBrowserEnv) return;
    this.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (this.reduceMotion) return;

    this.gsapService.load().then((gsap) => {
      gsap.set(this.el.nativeElement, { transformPerspective: 800 });
      this.quickRotateX = gsap.quickTo(this.el.nativeElement, 'rotateX', { duration: 0.4, ease: 'power3.out' });
      this.quickRotateY = gsap.quickTo(this.el.nativeElement, 'rotateY', { duration: 0.4, ease: 'power3.out' });
    });
  }

  @HostListener('pointermove', ['$event'])
  onMove(event: PointerEvent): void {
    if (this.reduceMotion || !this.quickRotateX || !this.quickRotateY) return;
    const rect = this.el.nativeElement.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    this.quickRotateY(px * this.appTiltMax * 2);
    this.quickRotateX(-py * this.appTiltMax * 2);
  }

  @HostListener('pointerleave')
  onLeave(): void {
    this.quickRotateX?.(0);
    this.quickRotateY?.(0);
  }
}
