import React, { useState, useEffect, useRef } from 'react';
import Coin from './components/Coin';
import History from './components/History';
import { LandingSections } from './components/LandingSections';
import { CoinSide, FlipResult, CoinStats } from './types';
import { getCoinInterpretation } from './services/geminiService';
import { COIN_TYPES } from './data/coins';

const App: React.FC = () => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<CoinSide>(CoinSide.HEADS);
  const [question, setQuestion] = useState('');
  const [history, setHistory] = useState<FlipResult[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [shareBtnText, setShareBtnText] = useState('Share Result');
  
  // Coin Selection State
  const [selectedCoinId, setSelectedCoinId] = useState(COIN_TYPES[0].id);
  const currentCoin = COIN_TYPES.find(c => c.id === selectedCoinId) || COIN_TYPES[0];

  // Stats
  const [stats, setStats] = useState<CoinStats>({
    heads: 0,
    tails: 0,
    total: 0,
    currentStreak: 0,
    streakSide: null
  });

  const handleFlip = async () => {
    if (isFlipping) return;

    setIsFlipping(true);
    setQuestion(q => q.trim());
    setShareBtnText('Share Result'); // Reset share button text
    
    // 1. Determine Result immediately
    const isHeads = Math.random() < 0.5;
    const newSide = isHeads ? CoinSide.HEADS : CoinSide.TAILS;
    
    // 2. Calculate Rotation
    // Increase spins to 10-20 to make it look faster/blurrier during the high toss
    const spins = 10 + Math.floor(Math.random() * 10); 
    const baseRotation = rotation + (spins * 360);
    
    const currentMod = baseRotation % 360;
    const targetMod = isHeads ? 0 : 180;
    
    let adjustment = targetMod - currentMod;
    if (adjustment < 0) adjustment += 360; 
    
    const finalRotation = baseRotation + adjustment;

    setRotation(finalRotation);

    // 3. Wait for animation
    // Synced with CSS transition: 2500ms
    setTimeout(async () => {
      setResult(newSide);
      setIsFlipping(false);
      
      updateStats(newSide);

      const newFlip: FlipResult = {
        id: crypto.randomUUID(),
        side: newSide,
        timestamp: Date.now(),
        question: question || undefined,
      };

      if (question) {
        setIsThinking(true);
        const interpretation = await getCoinInterpretation(newSide, question);
        newFlip.interpretation = interpretation;
        setIsThinking(false);
        setQuestion('');
      }

      setHistory(prev => [newFlip, ...prev]);
    }, 2500);
  };

  const handleShare = async () => {
    if (history.length === 0) return;
    
    const latestFlip = history[0];
    const text = `I flipped a ${currentCoin.name} on Cosmic Coin Flipper and got ${latestFlip.side}! ${latestFlip.interpretation ? `🔮 Oracle says: "${latestFlip.interpretation}"` : ''} \n\nTry it here: ${window.location.href}`;
    
    const fallbackCopy = async () => {
      try {
        await navigator.clipboard.writeText(text);
        setShareBtnText('Copied to Clipboard!');
        setTimeout(() => setShareBtnText('Share Result'), 2000);
      } catch (err) {
        console.error('Error copying to clipboard:', err);
      }
    };

    if (navigator.share) {
      try {
        const shareData: ShareData = {
          title: 'Cosmic Coin Flipper Result',
          text: text,
        };

        // Only add URL if it is a standard http/https URL to avoid "Invalid URL" errors
        if (window.location.protocol.startsWith('http')) {
          shareData.url = window.location.href;
        }

        await navigator.share(shareData);
      } catch (err) {
        console.error('Error sharing:', err);
        // Fallback to clipboard if share fails (e.g. invalid URL or user cancelled)
        await fallbackCopy();
      }
    } else {
      await fallbackCopy();
    }
  };

  const updateStats = (side: CoinSide) => {
    setStats(prev => {
      const isStreakContinued = prev.streakSide === side;
      return {
        heads: side === CoinSide.HEADS ? prev.heads + 1 : prev.heads,
        tails: side === CoinSide.TAILS ? prev.tails + 1 : prev.tails,
        total: prev.total + 1,
        currentStreak: isStreakContinued ? prev.currentStreak + 1 : 1,
        streakSide: side
      };
    });
  };

  const resetStats = () => {
    setStats({ heads: 0, tails: 0, total: 0, currentStreak: 0, streakSide: null });
    setHistory([]);
    setRotation(0);
    setResult(CoinSide.HEADS);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white overflow-y-auto">
      
      {/* Navbar / Header */}
      <header className="w-full p-6 flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto z-10">
        <div className="text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-amber-600 drop-shadow-lg">
            Cosmic Coin Flipper
          </h1>
          <p className="text-slate-400 text-xs tracking-wider uppercase mt-1">
            The Ultimate Decision Maker
          </p>
        </div>
        
        {/* Coin Selector */}
        <div className="mt-4 md:mt-0 relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg blur opacity-30 group-hover:opacity-75 transition duration-200"></div>
          <select 
            value={selectedCoinId}
            onChange={(e) => setSelectedCoinId(e.target.value)}
            disabled={isFlipping}
            className="relative bg-slate-900 border border-slate-700 text-slate-200 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-48 p-2.5 cursor-pointer hover:bg-slate-800 transition-colors"
          >
            {COIN_TYPES.map(coin => (
              <option key={coin.id} value={coin.id}>{coin.name} ({coin.country})</option>
            ))}
          </select>
        </div>
      </header>

      <main className="flex flex-col items-center w-full max-w-2xl z-10 pt-8 pb-20">
        
        {/* Coin Component */}
        <Coin isFlipping={isFlipping} result={result} rotation={rotation} coinDef={currentCoin} />

        {/* Status Text & Share */}
        <div className="min-h-[8rem] flex flex-col items-center justify-center mb-6 space-y-3">
          {isFlipping ? (
            <span className="text-3xl font-bold text-yellow-400 animate-pulse">Flipping...</span>
          ) : (
            <>
              <div className="text-center">
                <span className="text-5xl font-black tracking-widest text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                  {result}
                </span>
                {stats.currentStreak > 2 && (
                  <div className="text-xs text-orange-400 font-bold mt-1 uppercase tracking-widest animate-bounce">
                    🔥 {stats.currentStreak} Streak!
                  </div>
                )}
              </div>
              
              {stats.total > 0 && (
                 <button 
                  onClick={handleShare}
                  className="flex items-center space-x-2 px-4 py-2 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 rounded-full text-sm text-indigo-300 transition-all hover:scale-105"
                 >
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                   </svg>
                   <span>{shareBtnText}</span>
                 </button>
              )}
            </>
          )}
        </div>

        {/* Controls */}
        <div className="w-full max-w-md space-y-4 px-4">
          
          {/* Question Input */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a question (e.g. Should I verify?)"
              disabled={isFlipping}
              className="relative w-full bg-slate-900 text-white placeholder-slate-500 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
            {isThinking && (
              <div className="absolute right-3 top-3.5">
                <div className="animate-spin h-5 w-5 border-2 border-indigo-500 border-t-transparent rounded-full"></div>
              </div>
            )}
          </div>

          <button
            onClick={handleFlip}
            disabled={isFlipping}
            className={`w-full relative group py-4 rounded-xl font-bold text-lg tracking-wider transition-all transform active:scale-[0.98]
              ${isFlipping 
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/30'
              }`}
          >
            {isFlipping ? 'FATE IS SPINNING...' : 'FLIP COIN'}
          </button>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700 text-center">
              <div className="text-xs text-slate-400 uppercase">Heads</div>
              <div className="text-xl font-bold text-yellow-400">{stats.heads}</div>
              <div className="text-[10px] text-slate-500">{stats.total > 0 ? ((stats.heads / stats.total) * 100).toFixed(0) : 0}%</div>
            </div>
            <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700 text-center">
              <div className="text-xs text-slate-400 uppercase">Tails</div>
              <div className="text-xl font-bold text-slate-300">{stats.tails}</div>
              <div className="text-[10px] text-slate-500">{stats.total > 0 ? ((stats.tails / stats.total) * 100).toFixed(0) : 0}%</div>
            </div>
          </div>

          <button 
            onClick={resetStats}
            className="w-full text-xs text-slate-500 hover:text-slate-300 underline decoration-slate-600 hover:decoration-slate-400 underline-offset-4 transition-colors"
          >
            Reset Statistics
          </button>
        </div>

        {/* History Feed */}
        <div className="w-full px-4">
            <History history={history} />
        </div>

      </main>

      {/* SEO & Info Sections */}
      <div className="w-full bg-slate-900/40 border-t border-slate-800">
         <LandingSections />
      </div>
      
      <footer className="w-full py-8 text-center text-slate-600 text-sm border-t border-slate-800 bg-slate-950">
        <p>© {new Date().getFullYear()} Cosmic Coin Flipper. All rights reserved.</p>
        <p className="mt-1 text-xs">Powered by Gemini AI • Built with React</p>
      </footer>
    </div>
  );
};

export default App;