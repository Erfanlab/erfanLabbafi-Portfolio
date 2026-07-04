import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-noise-overlay',
  standalone: true,
  template: `<div class="fixed inset-0 z-50 grain" aria-hidden="true"></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'pointer-events: none;' },
})
export class NoiseOverlayComponent {}
