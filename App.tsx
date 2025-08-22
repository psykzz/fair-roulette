
import React, { useState, useEffect } from 'react';
import { useTeam } from './hooks/useTeam';
import TeamManagement from './components/TeamManagement';
import Avatar from './components/Avatar';
import { TeamMember } from './types';

const App: React.FC = () => {
  const { team, addMember, removeMember, selectFairly, loading, error, refreshTeam } = useTeam();
  const [selectedLeader, setSelectedLeader] = useState<TeamMember | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinDisplay, setSpinDisplay] = useState<string>('');

  useEffect(() => {
    let spinInterval: number;
    if (isSpinning && team.length > 0) {
      spinInterval = window.setInterval(() => {
        const randomIndex = Math.floor(Math.random() * team.length);
        setSpinDisplay(team[randomIndex].name);
      }, 75);
    }
    return () => clearInterval(spinInterval);
  }, [isSpinning, team]);

  const handleSelectLeader = () => {
    if (team.length === 0) return;

    setIsSpinning(true);
    setSelectedLeader(null);
    
    setTimeout(() => {
      const leader = selectFairly();
      setSelectedLeader(leader);
      setIsSpinning(false);
      setSpinDisplay('');
    }, 2000); // Spin for 2 seconds
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 space-y-12 font-sans">
      
      <header className="text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl">
          Fair Meeting <span className="text-indigo-400">Roulette</span>
        </h1>
        <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
          A fair and balanced way to choose your next meeting facilitator. The longer you wait, the higher your chances!
        </p>
      </header>

      <main className="w-full flex flex-col items-center space-y-8">
        {/* Loading State */}
        {loading && (
          <div className="w-full max-w-md bg-slate-800 rounded-xl shadow-2xl p-8 text-center">
            <div className="animate-spin h-8 w-8 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-slate-400">Loading team members...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="w-full max-w-md bg-red-900/20 border border-red-600 rounded-xl p-4 text-center">
            <p className="text-red-400 text-sm mb-2">⚠️ {error}</p>
            {refreshTeam && (
              <button 
                onClick={refreshTeam}
                className="text-red-300 hover:text-red-100 underline text-sm"
              >
                Try again
              </button>
            )}
          </div>
        )}

        {/* Main Roulette Interface */}
        {!loading && (
          <>
            <div className="w-full max-w-md bg-slate-800 rounded-xl shadow-2xl p-8 text-center space-y-6">
              <div className="h-32 flex flex-col items-center justify-center space-y-4">
                {isSpinning ? (
                  <div className="text-4xl font-bold text-indigo-300 animate-pulse">{spinDisplay}</div>
                ) : selectedLeader ? (
                  <div className="animate-reveal flex flex-col items-center space-y-3">
                    <Avatar src={selectedLeader.image} name={selectedLeader.name} size="xl" />
                    <div>
                      <p className="text-slate-400 text-lg">The chosen one is...</p>
                      <p className="text-4xl font-bold text-green-400 mt-1">{selectedLeader.name}!</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-2xl text-slate-500">Ready to pick a leader?</p>
                )}
              </div>

              <button
                onClick={handleSelectLeader}
                disabled={isSpinning || team.length === 0}
                className="w-full bg-indigo-600 text-white font-bold text-xl py-4 px-6 rounded-lg shadow-lg hover:bg-indigo-500 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 disabled:bg-slate-700 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSpinning ? 'Picking...' : 'Spin the Wheel!'}
              </button>
            </div>

            <TeamManagement team={team} addMember={addMember} removeMember={removeMember} />
          </>
        )}
      </main>

      <footer className="text-center text-slate-500 mt-8">
        <p>Built for fairness and fun.</p>
      </footer>
    </div>
  );
};

export default App;
