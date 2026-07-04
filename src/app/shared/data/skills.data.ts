import { Skill } from '../models/skill.model';

export const SKILLS: readonly Skill[] = [
  { name: 'Angular', category: 'core', level: 96 },
  { name: 'TypeScript', category: 'core', level: 94 },
  { name: 'Signals', category: 'core', level: 92 },
  { name: 'RxJS', category: 'core', level: 88 },
  { name: 'NgRx', category: 'core', level: 82 },
  { name: 'JavaScript', category: 'core', level: 93 },
  { name: 'REST API', category: 'core', level: 90 },
  { name: 'Tailwind CSS', category: 'tooling', level: 91 },
  { name: 'SCSS', category: 'tooling', level: 88 },
  { name: 'HTML', category: 'tooling', level: 96 },
  { name: 'CSS', category: 'tooling', level: 94 },
  { name: 'Git', category: 'tooling', level: 90 },
  { name: 'Performance Optimization', category: 'craft', level: 89 },
  { name: 'Accessibility', category: 'craft', level: 85 },
  { name: 'Responsive Design', category: 'craft', level: 93 },
  { name: 'Design Systems', category: 'craft', level: 87 },
  { name: 'Figma', category: 'craft', level: 80 },
  { name: 'Motion Design', category: 'craft', level: 86 },
] as const;
