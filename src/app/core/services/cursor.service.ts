import { Injectable, signal } from '@angular/core';

export type CursorVariant = 'default' | 'link' | 'drag' | 'view';

@Injectable({ providedIn: 'root' })
export class CursorService {
  readonly x = signal(0);
  readonly y = signal(0);
  readonly variant = signal<CursorVariant>('default');
  readonly visible = signal(false);

  setPosition(x: number, y: number): void {
    this.x.set(x);
    this.y.set(y);
  }

  enter(variant: CursorVariant = 'link'): void {
    this.variant.set(variant);
  }

  leave(): void {
    this.variant.set('default');
  }
}
