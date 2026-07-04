import { TimelineItem } from '../models/timeline-item.model';

export const TIMELINE: readonly TimelineItem[] = [
  {
    id: 'ee',
    period: '01',
    title: 'Electrical Engineering',
    description:
      'Started in electrical engineering — where signals, systems and precision first became second nature.',
  },
  {
    id: 'fe',
    period: '02',
    title: 'Front-End Development',
    description: 'Moved into front-end development, drawn to the intersection of engineering and interface.',
  },
  {
    id: 'mofid',
    period: '03',
    title: 'Mofid Securities',
    description: 'Built interfaces for real trading infrastructure — where a rendering delay is a real-money problem.',
  },
  {
    id: 'easytrader',
    period: '04',
    title: 'EasyTrader',
    description: 'Shipped the production frontend for a FinTech trading platform, end to end.',
  },
  {
    id: 'angular-infra',
    period: '05',
    title: 'Angular Infrastructure',
    description: 'Focused on scalable Angular architecture — design systems, performance, reusable component APIs.',
  },
  {
    id: 'ai',
    period: '06',
    title: 'AI',
    description: 'Brought AI-assisted workflows into the day-to-day — from tooling to interface intelligence.',
  },
  {
    id: 'teaching',
    period: '07',
    title: 'Teaching Angular',
    description: 'Now teaching Angular — turning five years of production lessons into other people\u2019s shortcuts.',
  },
] as const;
