import { ChangeDetectionStrategy, Component, ElementRef, PLATFORM_ID, inject, signal, viewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideAngularModule, Github, Linkedin, Send, Mail, Check } from 'lucide-angular';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { MagneticDirective } from '../../shared/directives/magnetic.directive';
import { GsapService } from '../../core/services/gsap.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, LucideAngularModule, SectionHeadingComponent, RevealDirective, MagneticDirective],
  templateUrl: './contact.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { id: 'contact', class: 'block scroll-mt-20' },
})
export class ContactComponent {
  private readonly fb = inject(FormBuilder);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly gsapService = inject(GsapService);
  private readonly sendButton = viewChild<ElementRef<HTMLButtonElement>>('sendButton');

  protected readonly GithubIcon = Github;
  protected readonly LinkedinIcon = Linkedin;
  protected readonly TelegramIcon = Send;
  protected readonly MailIcon = Mail;
  protected readonly CheckIcon = Check;

  protected readonly sent = signal(false);

  protected readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, email, message } = this.form.getRawValue();
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);

    this.playSendAnimation();

    if (this.isBrowser) {
      window.location.href = `mailto:hello@erfanlabbafi.dev?subject=${subject}&body=${body}`;
    }
  }

  private playSendAnimation(): void {
    this.sent.set(true);
    if (!this.isBrowser) return;

    this.gsapService.load().then((gsap) => {
      const btn = this.sendButton()?.nativeElement;
      if (!btn) return;
      gsap
        .timeline()
        .to(btn, { scale: 0.94, duration: 0.12, ease: 'power2.out' })
        .to(btn, { scale: 1, duration: 0.35, ease: 'back.out(3)' });
    });

    window.setTimeout(() => this.sent.set(false), 2400);
  }
}
