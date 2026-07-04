import { ChangeDetectionStrategy, Component, input } from '@angular/core';

interface TickerEntry {
  readonly label: string;
  readonly direction: 'up' | 'down';
}

@Component({
  selector: 'app-ticker-tape',
  standalone: true,
  templateUrl: './ticker-tape.component.html',
  styleUrl: './ticker-tape.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TickerTapeComponent {
  readonly items = input.required<readonly string[]>();

  protected entries(): readonly TickerEntry[] {
    return this.items().map((label, i) => ({ label, direction: i % 3 === 0 ? 'down' : 'up' }));
  }
}
