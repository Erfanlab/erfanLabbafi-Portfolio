import { Certification } from '../models/certification.model';

export const CERTIFICATIONS: readonly Certification[] = [
  { id: 'google-dm', title: 'Digital Marketing', issuer: 'Google', year: '2023' },
  { id: 'js-spec', title: 'JavaScript Specialist', issuer: 'Certification Body', year: '2022' },
  { id: 'ts-spec', title: 'TypeScript Specialist', issuer: 'Certification Body', year: '2023' },
  { id: 'quera-fe', title: 'Front-End Development', issuer: 'Quera', year: '2021' },
  { id: 'web-dev', title: 'Website Development', issuer: 'Certification Body', year: '2020' },
  { id: 'python', title: 'Python', issuer: 'Certification Body', year: '2020' },
  { id: 'excel', title: 'Excel', issuer: 'Certification Body', year: '2019' },
  { id: 'unity', title: 'Unity', issuer: 'Certification Body', year: '2019' },
] as const;
