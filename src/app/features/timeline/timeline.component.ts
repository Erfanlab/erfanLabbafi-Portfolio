import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, PLATFORM_ID, inject, viewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { GsapService } from '../../core/services/gsap.service';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { TIMELINE } from '../../shared/data/timeline.data';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [SectionHeadingComponent, RevealDirective],
  templateUrl: './timeline.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { id: 'timeline', class: 'block scroll-mt-20' },
})
export class TimelineComponent implements AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly gsapService = inject(GsapService);
  private readonly track = viewChild.required<ElementRef<HTMLElement>>('track');
  private readonly line = viewChild.required<ElementRef<HTMLElement>>('line');

  protected readonly items = TIMELINE;

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    this.gsapService.load().then((gsap) => {
      gsap.to(this.line().nativeElement, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: this.track().nativeElement,
          start: 'top 70%',
          end: 'bottom 60%',
          scrub: 0.4,
        },
      });
    });
  }
}
