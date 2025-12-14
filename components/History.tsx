import React from 'react';
import { FlipResult, CoinSide } from '../types';

interface HistoryProps {
  history: FlipResult[];
}

const History: React.FC<HistoryProps> = ({ history }) => {
  if (history.length === 0) return null;

  return (
    <div className="w-full max-w-md mx-auto mt-8 p-4 bg-slate-800/50 rounded-xl backdrop-blur-sm border border-slate-700/50">
      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 text-center">Recent Coin Flips</h3>
      <ul className="space-y-3 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
        {history.map((flip) => (
          <li key={flip.id} className="flex flex-col p-3 bg-slate-800 rounded-lg border border-slate-700 animate-[fadeIn_0.3s_ease-out]">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className={`w-3 h-3 rounded-full ${flip.side === CoinSide.HEADS ? 'bg-yellow-400' : 'bg-slate-400'}`}></span>
                <span className={`font-bold ${flip.side === CoinSide.HEADS ? 'text-yellow-400' : 'text-slate-300'}`}>
                  {flip.side}
                </span>
              </div>
              <span className="text-xs text-slate-500">
                {new Date(flip.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;