import { Directive, ElementRef, OnInit, inject } from '@angular/core';
import { GsapService } from '../../core/services/gsap.service';

/** Scales the directive host's first child from 0→1 as the page is scrolled. */
@Directive({
  selector: '[appScrollProgress]',
  standalone: true,
})
export class ScrollProgressDirective implements OnInit {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly gsapService = inject(GsapService);

  ngOnInit(): void {
    if (!this.gsapService.isBrowserEnv) return;

    this.gsapService.load().then((gsap) => {
      const bar = this.el.nativeElement.firstElementChild;
      if (!bar) return;
      gsap.to(bar, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      });
    });
  }
}
