
import { TeamMember } from './types';

export const INITIAL_TEAM: TeamMember[] = [
  { id: '1', name: 'Alice', weight: 10 },
  { id: '2', name: 'Bob', weight: 10 },
  { id: '3', name: 'Charlie', weight: 10 },
  { id: '4', name: 'Diana', weight: 10 },
];

export const STORAGE_KEY = 'fairMeetingRouletteTeam';
export const BASE_WEIGHT = 10;
export const SELECTED_WEIGHT = 1;
export const INCREMENT_WEIGHT = 1;
