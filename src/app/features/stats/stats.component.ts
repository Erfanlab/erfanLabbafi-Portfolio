import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { StatCounterComponent } from './stat-counter.component';
import { STATS } from '../../shared/data/stats.data';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [RevealDirective, StatCounterComponent],
  templateUrl: './stats.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block border-y border-line-soft bg-ink-2' },
})
export class StatsComponent {
  protected readonly stats = STATS;
}
