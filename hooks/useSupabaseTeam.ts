import { useState, useEffect, useCallback } from 'react';
import { TeamMember } from '../types';
import { supabase } from '../lib/supabase';
import { INITIAL_TEAM, getStorageKey, BASE_WEIGHT, SELECTED_WEIGHT, INCREMENT_WEIGHT } from '../constants';
import { ensureSessionId } from '../utils/sessionId';

export const useSupabaseTeam = () => {
  const sessionId = ensureSessionId();
  const storageKey = getStorageKey(sessionId);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Helper function to load from localStorage
  const loadFromLocalStorage = useCallback(() => {
    try {
      const storedTeam = window.localStorage.getItem(storageKey);
      return storedTeam ? JSON.parse(storedTeam) : INITIAL_TEAM;
    } catch (error) {
      console.error("Error reading from localStorage", error);
      return INITIAL_TEAM;
    }
  }, [storageKey]);

  // Helper function to save to localStorage
  const saveToLocalStorage = useCallback((teamData: TeamMember[]) => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(teamData));
    } catch (error) {
      console.error("Error writing to localStorage", error);
    }
  }, [storageKey]);

  // Load team members from Supabase
  const loadTeam = useCallback(async () => {
    if (!supabase) {
      setError('Supabase client not configured');
      const localTeam = loadFromLocalStorage();
      setTeam(localTeam);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const { data, error: supabaseError } = await supabase
        .from('team_members')
        .select('*')
        .order('created_at', { ascending: true });

      if (supabaseError) {
        throw supabaseError;
      }

      if (data && data.length > 0) {
        setTeam(data);
        saveToLocalStorage(data);
      } else {
        // If no data exists, initialize with default team
        await initializeDefaultTeam();
      }
    } catch (error) {
      console.error('Error loading team:', error);
      setError(error instanceof Error ? error.message : 'Failed to load team');
      // Fallback to localStorage
      const localTeam = loadFromLocalStorage();
      setTeam(localTeam);
    } finally {
      setLoading(false);
    }
  }, [loadFromLocalStorage, saveToLocalStorage]);

  // Initialize default team in Supabase
  const initializeDefaultTeam = useCallback(async () => {
    if (!supabase) {
      setTeam(INITIAL_TEAM);
      saveToLocalStorage(INITIAL_TEAM);
      return;
    }

    try {
      const teamToInsert = INITIAL_TEAM.map(member => ({
        id: member.id,
        name: member.name,
        weight: member.weight
      }));

      const { data, error } = await supabase
        .from('team_members')
        .insert(teamToInsert)
        .select();

      if (error) {
        throw error;
      }

      if (data) {
        setTeam(data);
        saveToLocalStorage(data);
      }
    } catch (error) {
      console.error('Error initializing default team:', error);
      // Fallback to local state
      setTeam(INITIAL_TEAM);
      saveToLocalStorage(INITIAL_TEAM);
    }
  }, [saveToLocalStorage]);

  // Load team on mount
  useEffect(() => {
    loadTeam();
  }, [loadTeam]);

  const addMember = useCallback(async (name: string) => {
    if (name.trim() === '') return;
    
    if (!supabase) {
      // Fallback to local state
      const fallbackMember: TeamMember = {
        id: crypto.randomUUID(),
        name: name.trim(),
        weight: BASE_WEIGHT,
      };
      const newTeam = [...team, fallbackMember];
      setTeam(newTeam);
      saveToLocalStorage(newTeam);
      return;
    }
    
    try {
      setError(null);
      const newMember = {
        name: name.trim(),
        weight: BASE_WEIGHT,
      };

      const { data, error } = await supabase
        .from('team_members')
        .insert([newMember])
        .select()
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        const newTeam = [...team, data];
        setTeam(newTeam);
        saveToLocalStorage(newTeam);
      }
    } catch (error) {
      console.error('Error adding member:', error);
      setError(error instanceof Error ? error.message : 'Failed to add member');
      // Fallback to local state
      const fallbackMember: TeamMember = {
        id: crypto.randomUUID(),
        name: name.trim(),
        weight: BASE_WEIGHT,
      };
      const newTeam = [...team, fallbackMember];
      setTeam(newTeam);
      saveToLocalStorage(newTeam);
    }
  }, [saveToLocalStorage, team]);

  const removeMember = useCallback(async (id: string) => {
    if (!supabase) {
      // Fallback to local state
      const newTeam = team.filter(member => member.id !== id);
      setTeam(newTeam);
      saveToLocalStorage(newTeam);
      return;
    }

    try {
      setError(null);
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      const newTeam = team.filter(member => member.id !== id);
      setTeam(newTeam);
      saveToLocalStorage(newTeam);
    } catch (error) {
      console.error('Error removing member:', error);
      setError(error instanceof Error ? error.message : 'Failed to remove member');
      // Still update local state even if database update fails
      const newTeam = team.filter(member => member.id !== id);
      setTeam(newTeam);
      saveToLocalStorage(newTeam);
    }
  }, [saveToLocalStorage, team]);

  const selectFairly = useCallback(async () => {
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

    if (!supabase) {
      // Fallback to local state
      setTeam(updatedTeam);
      saveToLocalStorage(updatedTeam);
      return selectedMember;
    }

    // Update weights in Supabase
    try {
      setError(null);
      const updatePromises = updatedTeam.map(member => 
        supabase
          .from('team_members')
          .update({ weight: member.weight })
          .eq('id', member.id)
      );

      await Promise.all(updatePromises);
      setTeam(updatedTeam);
      saveToLocalStorage(updatedTeam);
    } catch (error) {
      console.error('Error updating weights:', error);
      setError(error instanceof Error ? error.message : 'Failed to update weights');
      // Still update local state even if database update fails
      setTeam(updatedTeam);
      saveToLocalStorage(updatedTeam);
    }

    return selectedMember;
  }, [team, saveToLocalStorage]);

  return { 
    team, 
    addMember, 
    removeMember, 
    selectFairly, 
    loading, 
    error,
    refreshTeam: loadTeam
  };
};