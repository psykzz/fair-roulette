
import { useState, useEffect, useCallback } from 'react';
import { TeamMember } from '../types';
import { INITIAL_TEAM, STORAGE_KEY, BASE_WEIGHT, SELECTED_WEIGHT, INCREMENT_WEIGHT } from '../constants';
import { useSupabaseTeam } from './useSupabaseTeam';

// Check if Supabase is configured
const isSupabaseConfigured = () => {
  return !!(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);
};

// Original localStorage-based implementation
const useLocalStorageTeam = () => {
  const [team, setTeam] = useState<TeamMember[]>(() => {
    try {
      const storedTeam = window.localStorage.getItem(STORAGE_KEY);
      return storedTeam ? JSON.parse(storedTeam) : INITIAL_TEAM;
    } catch (error) {
      console.error("Error reading from localStorage", error);
      return INITIAL_TEAM;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(team));
    } catch (error) {
      console.error("Error writing to localStorage", error);
    }
  }, [team]);

  const addMember = useCallback((name: string) => {
    if (name.trim() === '') return;
    const newMember: TeamMember = {
      id: crypto.randomUUID(),
      name: name.trim(),
      weight: BASE_WEIGHT,
    };
    setTeam(prevTeam => [...prevTeam, newMember]);
  }, []);

  const removeMember = useCallback((id: string) => {
    setTeam(prevTeam => prevTeam.filter(member => member.id !== id));
  }, []);

  const selectFairly = useCallback(() => {
    if (team.length === 0) return null;

    const totalWeight = team.reduce((sum, member) => sum + member.weight, 0);
    let random = Math.random() * totalWeight;

    let selectedMember: TeamMember | null = null;
    for (const member of team) {
      random -= member.weight;
      if (random <= 0) {
        selectedMember = member;
        break;
      }
    }
    
    // Fallback in case of floating point inaccuracies
    if (!selectedMember) {
        selectedMember = team[team.length - 1];
    }

    // Update weights for fairness
    const updatedTeam = team.map(member => {
      if (member.id === selectedMember!.id) {
        return { ...member, weight: SELECTED_WEIGHT };
      }
      return { ...member, weight: member.weight + INCREMENT_WEIGHT };
    });

    setTeam(updatedTeam);
    return selectedMember;
  }, [team]);

  return { 
    team, 
    addMember, 
    removeMember, 
    selectFairly, 
    loading: false, 
    error: null,
    refreshTeam: () => {} 
  };
};

export const useTeam = () => {
  if (isSupabaseConfigured()) {
    return useSupabaseTeam();
  } else {
    console.log('Supabase not configured, using localStorage fallback');
    return useLocalStorageTeam();
  }
};
