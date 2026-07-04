import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LucideAngularModule, MapPin, Briefcase, Calendar } from 'lucide-angular';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

interface Fact {
  readonly icon: typeof MapPin;
  readonly label: string;
  readonly value: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [LucideAngularModule, SectionHeadingComponent, RevealDirective],
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { id: 'about', class: 'block scroll-mt-20' },
})
export class AboutComponent {
  protected readonly facts: readonly Fact[] = [
    { icon: MapPin, label: 'Location', value: 'Tehran, Iran' },
    { icon: Briefcase, label: 'Industry', value: 'FinTech' },
    { icon: Calendar, label: 'Experience', value: '5+ Years' },
  ];
}
