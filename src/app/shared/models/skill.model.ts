export type SkillCategory = 'core' | 'tooling' | 'craft';

export interface Skill {
  readonly name: string;
  readonly category: SkillCategory;
  /** 0-100, self-assessed proficiency used for the terminal-style meter. */
  readonly level: number;
}
