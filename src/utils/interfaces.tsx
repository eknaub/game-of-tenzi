export interface IDie {
  id: string;
  value: number;
  isHeld: boolean;
}

export interface ILeaderboardEntry {
  name: string;
  score: number;
}

export interface ILeaderboard {
  entries: ILeaderboardEntry[];
}
