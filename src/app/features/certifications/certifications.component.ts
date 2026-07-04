import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LucideAngularModule, BadgeCheck } from 'lucide-angular';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { CERTIFICATIONS } from '../../shared/data/certifications.data';

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [LucideAngularModule, SectionHeadingComponent, RevealDirective],
  templateUrl: './certifications.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { id: 'certifications', class: 'block scroll-mt-20' },
})
export class CertificationsComponent {
  protected readonly BadgeIcon = BadgeCheck;
  protected readonly certifications = CERTIFICATIONS;
}
