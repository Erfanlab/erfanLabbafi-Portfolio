import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { TickerTapeComponent } from '../../shared/components/ticker-tape/ticker-tape.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { SKILLS } from '../../shared/data/skills.data';
import { Skill, SkillCategory } from '../../shared/models/skill.model';

const CATEGORY_LABEL: Record<SkillCategory, string> = {
  core: 'Core Stack',
  tooling: 'Tooling & Styling',
  craft: 'Craft & Practice',
};

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [SectionHeadingComponent, TickerTapeComponent, RevealDirective],
  templateUrl: './skills.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { id: 'skills', class: 'block scroll-mt-20' },
})
export class SkillsComponent {
  private readonly allSkills = signal<readonly Skill[]>(SKILLS);

  /** Grouped once via computed — recalculates only if the source signal changes. */
  protected readonly groups = computed(() => {
    const byCategory = new Map<SkillCategory, Skill[]>();
    for (const skill of this.allSkills()) {
      const bucket = byCategory.get(skill.category) ?? [];
      bucket.push(skill);
      byCategory.set(skill.category, bucket);
    }
    return Array.from(byCategory.entries()).map(([category, skills]) => ({
      category,
      label: CATEGORY_LABEL[category],
      skills,
    }));
  });

  protected readonly tickerItems = computed(() => this.allSkills().map((s) => s.name));
}
