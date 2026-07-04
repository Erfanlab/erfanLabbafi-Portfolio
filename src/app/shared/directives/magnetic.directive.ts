import { Directive, ElementRef, HostListener, Input, OnInit, inject } from '@angular/core';
import { GsapService } from '../../core/services/gsap.service';
import { CursorService } from '../../core/services/cursor.service';

@Directive({
  selector: '[appMagnetic]',
  standalone: true,
})
export class MagneticDirective implements OnInit {
  /** Max pull distance in pixels. */
  @Input() appMagneticStrength = 18;

  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly gsapService = inject(GsapService);
  private readonly cursor = inject(CursorService);
  private quickX?: (v: number) => void;
  private quickY?: (v: number) => void;
  private reduceMotion = false;

  ngOnInit(): void {
    if (!this.gsapService.isBrowserEnv) return;
    this.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (this.reduceMotion) return;

    this.gsapService.load().then((gsap) => {
      this.quickX = gsap.quickTo(this.el.nativeElement, 'x', { duration: 0.5, ease: 'power3.out' });
      this.quickY = gsap.quickTo(this.el.nativeElement, 'y', { duration: 0.5, ease: 'power3.out' });
    });
  }

  @HostListener('pointerenter')
  onEnter(): void {
    this.cursor.enter('link');
  }

  @HostListener('pointermove', ['$event'])
  onMove(event: PointerEvent): void {
    if (this.reduceMotion || !this.quickX || !this.quickY) return;
    const rect = this.el.nativeElement.getBoundingClientRect();
    const relX = event.clientX - (rect.left + rect.width / 2);
    const relY = event.clientY - (rect.top + rect.height / 2);
    const strength = this.appMagneticStrength;
    this.quickX(Math.max(-strength, Math.min(strength, relX * 0.4)));
    this.quickY(Math.max(-strength, Math.min(strength, relY * 0.4)));
  }

  @HostListener('pointerleave')
  onLeave(): void {
    this.cursor.leave();
    this.quickX?.(0);
    this.quickY?.(0);
  }
}
