
export type GoalPeriod = 'today' | 'week' | 'month';

export interface Goal {
  today: string;
  week?: string;
  month?: string;
}

export type GoalCategory = 'murajaat' | 'juzHaali' | 'jadeed';

export interface AppGoals {
  murajaat: Goal;
  juzHaali: Goal;
  jadeed: Goal;
}
