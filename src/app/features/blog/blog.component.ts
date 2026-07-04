import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

interface Topic {
  readonly title: string;
  readonly tag: string;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [SectionHeadingComponent, RevealDirective],
  templateUrl: './blog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { id: 'blog', class: 'block scroll-mt-20' },
})
export class BlogComponent {
  protected readonly topics: readonly Topic[] = [
    { title: 'Migrating from RxJS-heavy state to Signals', tag: 'Signals' },
    { title: 'A performance budget for enterprise Angular', tag: 'Performance' },
    { title: 'Typing component APIs so misuse won\u2019t compile', tag: 'TypeScript' },
    { title: 'Motion that respects prefers-reduced-motion', tag: 'Animations' },
    { title: 'Standalone components at scale', tag: 'Architecture' },
    { title: 'Design systems that survive product pivots', tag: 'Angular' },
  ];
}
