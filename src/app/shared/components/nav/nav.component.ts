import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LucideAngularModule, Menu, X } from 'lucide-angular';
import { MagneticDirective } from '../../directives/magnetic.directive';

interface NavLink {
  readonly href: string;
  readonly label: string;
}

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [LucideAngularModule, MagneticDirective],
  templateUrl: './nav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class NavComponent implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  protected readonly MenuIcon = Menu;
  protected readonly CloseIcon = X;

  protected readonly scrolled = signal(false);
  protected readonly menuOpen = signal(false);
  protected readonly tehranTime = signal('--:--');

  protected readonly links: readonly NavLink[] = [
    { href: '#about', label: 'About' },
    { href: '#timeline', label: 'Journey' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ];

  ngOnInit(): void {
    if (!this.isBrowser) return;

    const onScroll = (): void => this.scrolled.set(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const formatter = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Tehran',
    });
    const tick = (): void => this.tehranTime.set(formatter.format(new Date()));
    tick();
    const interval = window.setInterval(tick, 30_000);

    this.destroyRef.onDestroy(() => {
      window.removeEventListener('scroll', onScroll);
      window.clearInterval(interval);
    });
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
