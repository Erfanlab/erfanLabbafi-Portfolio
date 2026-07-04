import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-section-heading',
  standalone: true,
  imports: [RevealDirective],
  template: `
    <div appReveal>
      <p class="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-signal">
        <span class="h-px w-6 bg-signal"></span>
        {{ eyebrow() }}
      </p>
      <h2 class="mt-4 font-display text-balance text-3xl font-medium text-fg md:text-4xl lg:text-5xl">
        {{ title() }}
      </h2>
      @if (description()) {
        <p class="mt-4 max-w-xl text-balance text-fg-dim">{{ description() }}</p>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionHeadingComponent {
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly description = input<string>('');
}
