
import React, { useState } from 'react';
import { TeamMember } from '../types';

interface TeamManagementProps {
  team: TeamMember[];
  addMember: (name: string) => void;
  removeMember: (id: string) => void;
}

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
  </svg>
);

const TeamManagement: React.FC<TeamManagementProps> = ({ team, addMember, removeMember }) => {
  const [newMemberName, setNewMemberName] = useState('');

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    addMember(newMemberName);
    setNewMemberName('');
  };

  const getChance = (weight: number) => {
      const totalWeight = team.reduce((acc, member) => acc + member.weight, 0);
      if (totalWeight === 0) return '0%';
      return `${((weight / totalWeight) * 100).toFixed(1)}%`;
  }

  return (
    <div className="w-full max-w-md mx-auto bg-slate-800 rounded-xl shadow-lg p-6 space-y-6">
      <h2 className="text-2xl font-bold text-center text-indigo-400">Manage Team</h2>
      
      <form onSubmit={handleAddMember} className="flex gap-2">
        <input
          type="text"
          value={newMemberName}
          onChange={(e) => setNewMemberName(e.target.value)}
          placeholder="Add new team member"
          className="flex-grow bg-slate-700 text-white placeholder-slate-400 rounded-md px-4 py-2 border border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-md px-4 py-2 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
          disabled={!newMemberName.trim()}
        >
          Add
        </button>
      </form>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-slate-300 border-b border-slate-700 pb-2">Current Members ({team.length})</h3>
        {team.length > 0 ? (
          <ul className="max-h-60 overflow-y-auto pr-2">
            {team.map((member) => (
              <li key={member.id} className="flex items-center justify-between bg-slate-700/50 p-3 rounded-lg mb-2 group">
                <div className="flex items-center gap-4">
                    <div className="font-mono text-xs text-indigo-300 w-14 text-right">{getChance(member.weight)}</div>
                    <span className="text-slate-100">{member.name}</span>
                </div>
                <button
                  onClick={() => removeMember(member.id)}
                  className="text-slate-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                  aria-label={`Remove ${member.name}`}
                >
                  <TrashIcon />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-slate-400 py-4">Add some team members to get started!</p>
        )}
      </div>
    </div>
  );
};

export default TeamManagement;
