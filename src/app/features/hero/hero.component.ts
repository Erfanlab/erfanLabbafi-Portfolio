import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LucideAngularModule, ArrowRight, Download, ChevronDown } from 'lucide-angular';
import { GsapService } from '../../core/services/gsap.service';
import { MagneticDirective } from '../../shared/directives/magnetic.directive';
import { MarketGraphCanvasComponent } from './market-graph-canvas.component';

const HEADLINE_LINE_1 = ['Front-End', 'Engineer.'];
const HEADLINE_LINE_2 = ['Building', 'high-performance'];
const HEADLINE_LINE_3 = ['FinTech', 'experiences.'];

const SNIPPETS = [
  { code: 'signal(price)', top: '18%', left: '6%', delay: 0 },
  { code: 'computed(() => risk)', top: '68%', left: '4%', delay: 0.15 },
  { code: 'effect(sync)', top: '30%', left: '88%', delay: 0.3 },
  { code: '@if (isLive) {…}', top: '76%', left: '86%', delay: 0.45 },
] as const;

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [LucideAngularModule, MagneticDirective, MarketGraphCanvasComponent],
  templateUrl: './hero.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { id: 'top', class: 'relative block' },
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly gsapService = inject(GsapService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly ArrowIcon = ArrowRight;
  protected readonly DownloadIcon = Download;
  protected readonly ChevronIcon = ChevronDown;

  protected readonly line1 = HEADLINE_LINE_1;
  protected readonly line2 = HEADLINE_LINE_2;
  protected readonly line3 = HEADLINE_LINE_3;
  protected readonly snippets = SNIPPETS;

  protected readonly glowX = signal('50%');
  protected readonly glowY = signal('35%');

  private readonly root = viewChild.required<ElementRef<HTMLElement>>('heroRoot');
  private onPointerMove?: (e: PointerEvent) => void;

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    this.onPointerMove = (e: PointerEvent) => {
      const rect = this.root().nativeElement.getBoundingClientRect();
      this.glowX.set(`${((e.clientX - rect.left) / rect.width) * 100}%`);
      this.glowY.set(`${((e.clientY - rect.top) / rect.height) * 100}%`);
    };
    this.root().nativeElement.addEventListener('pointermove', this.onPointerMove);

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.gsapService.load().then((gsap) => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (!reduceMotion) {
        tl.from('.hero-eyebrow', { opacity: 0, y: 12, duration: 0.6 })
          .from('.hero-word', { opacity: 0, yPercent: 120, stagger: 0.045, duration: 0.9 }, '-=0.3')
          .from('.hero-subtitle', { opacity: 0, y: 16, duration: 0.7 }, '-=0.5')
          .from('.hero-cta', { opacity: 0, y: 16, stagger: 0.1, duration: 0.6 }, '-=0.4')
          .from('.hero-snippet', { opacity: 0, scale: 0.9, stagger: 0.08, duration: 0.6 }, '-=0.5')
          .from('.hero-scroll-cue', { opacity: 0, duration: 0.6 }, '-=0.2');
      } else {
        gsap.set(['.hero-eyebrow', '.hero-word', '.hero-subtitle', '.hero-cta', '.hero-snippet', '.hero-scroll-cue'], {
          opacity: 1,
          y: 0,
          yPercent: 0,
          scale: 1,
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.onPointerMove) {
      this.root().nativeElement.removeEventListener('pointermove', this.onPointerMove);
    }
  }
}
