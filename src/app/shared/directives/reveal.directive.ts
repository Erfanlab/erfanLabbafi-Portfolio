import { Directive, ElementRef, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { GsapService } from '../../core/services/gsap.service';

/**
 * Fades + lifts an element into place the first time it crosses into the
 * viewport. Pairs with the `[data-reveal]` base styles in styles.css so
 * there's no flash-of-unrevealed-content before GSAP takes over.
 */
@Directive({
  selector: '[appReveal]',
  standalone: true,
  host: { 'data-reveal': '' },
})
export class RevealDirective implements OnInit, OnDestroy {
  @Input() appRevealDelay = 0;
  @Input() appRevealY = 24;

  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly gsapService = inject(GsapService);
  private trigger?: { kill: () => void };

  ngOnInit(): void {
    if (!this.gsapService.isBrowserEnv) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    this.gsapService.load().then((gsap) => {
      const ctx = gsap.fromTo(
        this.el.nativeElement,
        { opacity: 0, y: this.appRevealY },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: this.appRevealDelay,
          ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: this.el.nativeElement,
            start: 'top 88%',
            once: true,
          },
        },
      );
      this.trigger = ctx.scrollTrigger ?? undefined;
    });
  }

  ngOnDestroy(): void {
    this.trigger?.kill();
  }
}
