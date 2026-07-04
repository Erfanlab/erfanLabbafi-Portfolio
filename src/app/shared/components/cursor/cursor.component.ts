import { ChangeDetectionStrategy, Component, ElementRef, HostListener, OnInit, inject, viewChild } from '@angular/core';
import { GsapService } from '../../../core/services/gsap.service';
import { CursorService } from '../../../core/services/cursor.service';

@Component({
  selector: 'app-cursor',
  standalone: true,
  template: `
    <div #ring class="cursor-ring" [class.cursor-ring--link]="variant() === 'link'" aria-hidden="true"></div>
    <div #dot class="cursor-dot" aria-hidden="true"></div>
  `,
  styleUrl: './cursor.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CursorComponent implements OnInit {
  private readonly gsapService = inject(GsapService);
  protected readonly cursor = inject(CursorService);
  protected readonly variant = this.cursor.variant;

  private readonly ring = viewChild.required<ElementRef<HTMLElement>>('ring');
  private readonly dot = viewChild.required<ElementRef<HTMLElement>>('dot');

  private ringX?: (v: number) => void;
  private ringY?: (v: number) => void;
  private dotX?: (v: number) => void;
  private dotY?: (v: number) => void;

  ngOnInit(): void {
    if (!('matchMedia' in window) || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    document.body.classList.add('has-custom-cursor');

    this.gsapService.load().then((gsap) => {
      const ringEl = this.ring().nativeElement;
      const dotEl = this.dot().nativeElement;
      this.ringX = gsap.quickTo(ringEl, 'x', { duration: 0.5, ease: 'power3.out' });
      this.ringY = gsap.quickTo(ringEl, 'y', { duration: 0.5, ease: 'power3.out' });
      this.dotX = gsap.quickTo(dotEl, 'x', { duration: 0.12, ease: 'power3.out' });
      this.dotY = gsap.quickTo(dotEl, 'y', { duration: 0.12, ease: 'power3.out' });
    });
  }

  @HostListener('window:pointermove', ['$event'])
  onMove(event: PointerEvent): void {
    this.cursor.setPosition(event.clientX, event.clientY);
    this.ringX?.(event.clientX);
    this.ringY?.(event.clientY);
    this.dotX?.(event.clientX);
    this.dotY?.(event.clientY);
  }
}
