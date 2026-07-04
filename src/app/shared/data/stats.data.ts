import { Stat } from '../models/stat.model';

export const STATS: readonly Stat[] = [
  { id: 'years', value: 5, suffix: '+', label: 'Years Experience' },
  { id: 'projects', value: 20, suffix: '+', label: 'Projects' },
  { id: 'followers', value: 1000, suffix: '+', label: 'LinkedIn Followers' },
  { id: 'users', display: 'Thousands', label: 'End Users Served' },
] as const;
