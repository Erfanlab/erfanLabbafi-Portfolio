import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  inject,
  input,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { GsapService } from '../../core/services/gsap.service';

@Component({
  selector: 'app-stat-counter',
  standalone: true,
  template: `
    @if (displayValue(); as text) {
      <span class="font-display text-sm lg:text-lg">{{ text }}</span>
    } @else {
      <span class="font-mono-tabular text-sm lg:text-lg">{{ current() }}{{ suffix() }}</span>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'inline-block tabular-nums' },
})
export class StatCounterComponent implements AfterViewInit, OnDestroy {
  readonly target = input<number>(0);
  readonly suffix = input('');
  /** Non-numeric override (e.g. "Thousands") — skips the count-up animation. */
  readonly displayValue = input<string | undefined>(undefined);

  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly gsapService = inject(GsapService);
  private readonly el = inject(ElementRef<HTMLElement>);

  protected readonly current = signal(0);
  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    if (!this.isBrowser || this.displayValue()) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      this.current.set(this.target());
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          this.animateCount();
          this.observer?.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private animateCount(): void {
    this.gsapService.load().then((gsap) => {
      const proxy = { value: 0 };
      gsap.to(proxy, {
        value: this.target(),
        duration: 1.6,
        ease: 'power2.out',
        onUpdate: () => this.current.set(Math.round(proxy.value)),
      });
    });
  }
}
