import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LucideAngularModule, Github, Linkedin, Send, ArrowUp } from 'lucide-angular';
import { MagneticDirective } from '../../directives/magnetic.directive';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [LucideAngularModule, MagneticDirective],
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  protected readonly GithubIcon = Github;
  protected readonly LinkedinIcon = Linkedin;
  protected readonly SendIcon = Send;
  protected readonly ArrowUpIcon = ArrowUp;
  protected readonly year = new Date().getFullYear();
}
