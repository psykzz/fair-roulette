
import { TeamMember } from './types';

export const INITIAL_TEAM: TeamMember[] = [
  { id: '1', name: 'Alice', weight: 10, image: 'https://images.unsplash.com/photo-1494790108755-2616b612b372?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80' },
  { id: '2', name: 'Bob', weight: 10, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80' },
  { id: '3', name: 'Charlie', weight: 10, image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80' },
  { id: '4', name: 'Diana', weight: 10, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80' },
];

export const STORAGE_KEY = 'fairMeetingRouletteTeam';
export const BASE_WEIGHT = 10;
export const SELECTED_WEIGHT = 1;
export const INCREMENT_WEIGHT = 1;
