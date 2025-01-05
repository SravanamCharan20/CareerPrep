import { LucideIcon } from 'lucide-react';

export interface PracticeCategory {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  topics: string[];
  totalProblems: number;
}