export interface Day {
  value: Date;
  enabled: boolean;
  weekend: boolean;
}

export interface Week {
  days: Day[];
}

export interface Month {
  title: string;
  year: string;
  weeks: Week[];
}
