import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { LucideAngularModule, ExternalLink, Github } from 'lucide-angular';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { TiltDirective } from '../../shared/directives/tilt.directive';
import { MagneticDirective } from '../../shared/directives/magnetic.directive';
import { PROJECTS } from '../../shared/data/projects.data';
import { Project } from '../../shared/models/project.model';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [LucideAngularModule, SectionHeadingComponent, RevealDirective, TiltDirective, MagneticDirective],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { id: 'projects', class: 'block scroll-mt-20' },
})
export class ProjectsComponent {
  protected readonly ExternalLinkIcon = ExternalLink;
  protected readonly GithubIcon = Github;

  private readonly all = signal<readonly Project[]>(PROJECTS);
  protected readonly featured = computed(() => this.all().find((p) => p.featured));
  protected readonly rest = computed(() => this.all().filter((p) => !p.featured));
}
