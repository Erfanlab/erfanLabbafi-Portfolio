import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { AboutComponent } from '../about/about.component';
import { TimelineComponent } from '../timeline/timeline.component';
import { SkillsComponent } from '../skills/skills.component';
import { StatsComponent } from '../stats/stats.component';
import { ProjectsComponent } from '../projects/projects.component';
import { CertificationsComponent } from '../certifications/certifications.component';
import { BlogComponent } from '../blog/blog.component';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    AboutComponent,
    TimelineComponent,
    SkillsComponent,
    StatsComponent,
    ProjectsComponent,
    CertificationsComponent,
    BlogComponent,
    ContactComponent,
  ],
  template: `
    <app-hero />
    <app-about />
    <app-timeline />
    <app-skills />
    <app-stats />
    <app-projects />
    <app-certifications />
    <app-blog />
    <app-contact />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
