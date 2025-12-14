import React, { useState, useEffect, useRef } from 'react';
import Coin from './components/Coin';
import History from './components/History';
import { LandingSections } from './components/LandingSections';
import { CoinSide, FlipResult, CoinStats } from './types';
// import { getCoinInterpretation } from './services/geminiService'; // Disabled for Vercel deployment without API Key
import { playFlipSound, playLandSound } from './services/audioService';
import { COIN_TYPES } from './data/coins';

const App: React.FC = () => {
  // Mode State: 'single' | 'batch'
  const [mode, setMode] = useState<'single' | 'batch'>('single');

  // Single Flip State
  const [isFlipping, setIsFlipping] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<CoinSide>(CoinSide.HEADS);
  // const [question, setQuestion] = useState(''); // Removed AI Input
  const [history, setHistory] = useState<FlipResult[]>([]);
  // const [isThinking, setIsThinking] = useState(false); // Removed AI State
  const [shareBtnText, setShareBtnText] = useState('Share Coin Flip');
  const [selectedCoinId, setSelectedCoinId] = useState(COIN_TYPES[0].id);
  const currentCoin = COIN_TYPES.find(c => c.id === selectedCoinId) || COIN_TYPES[0];
  const [stats, setStats] = useState<CoinStats>({
    heads: 0,
    tails: 0,
    total: 0,
    currentStreak: 0,
    streakSide: null
  });

  // Batch Flip State
  const [batchCount, setBatchCount] = useState<number>(10);
  const [customHeads, setCustomHeads] = useState<string>('Heads');
  const [customTails, setCustomTails] = useState<string>('Tails');
  const [separator, setSeparator] = useState<string>(', ');
  const [batchResults, setBatchResults] = useState<CoinSide[]>([]);
  const [batchStats, setBatchStats] = useState({ heads: 0, tails: 0 });
  const [copyFeedback, setCopyFeedback] = useState('');

  // --- Single Flip Logic ---
  const handleFlip = async () => {
    if (isFlipping) return;

    // Start Flip Animation & Sound
    setIsFlipping(true);
    playFlipSound(); // Play toss sound

    setShareBtnText('Share Coin Flip'); 
    
    const isHeads = Math.random() < 0.5;
    const newSide = isHeads ? CoinSide.HEADS : CoinSide.TAILS;
    
    // Rotation logic
    const spins = 10 + Math.floor(Math.random() * 10); 
    const baseRotation = rotation + (spins * 360);
    const currentMod = baseRotation % 360;
    const targetMod = isHeads ? 0 : 180;
    let adjustment = targetMod - currentMod;
    if (adjustment < 0) adjustment += 360; 
    const finalRotation = baseRotation + adjustment;

    setRotation(finalRotation);

    // Wait for animation to finish
    setTimeout(async () => {
      setResult(newSide);
      setIsFlipping(false);
      playLandSound(); // Play landing sound
      
      updateStats(newSide);

      const newFlip: FlipResult = {
        id: crypto.randomUUID(),
        side: newSide,
        timestamp: Date.now(),
        // question: question || undefined, // AI Disabled
      };

      // AI Logic Disabled for Vercel/No-Backend
      /*
      if (question) {
        setIsThinking(true);
        const interpretation = await getCoinInterpretation(newSide, question);
        newFlip.interpretation = interpretation;
        setIsThinking(false);
        setQuestion('');
      }
      */

      setHistory(prev => [newFlip, ...prev]);
    }, 2500);
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

  const handleShare = async () => {
    if (history.length === 0) return;
    const latestFlip = history[0];
    const text = `I just used the Cosmic Coin Flip and got ${latestFlip.side}! Flip a coin yourself here: ${window.location.href}`;
    
    const fallbackCopy = async () => {
      try {
        await navigator.clipboard.writeText(text);
        setShareBtnText('Copied!');
        setTimeout(() => setShareBtnText('Share Coin Flip'), 2000);
      } catch (err) {
        console.error('Error copying:', err);
      }
    };

    if (navigator.share) {
      try {
        const shareData: ShareData = { title: 'Coin Flip Result', text: text };
        if (window.location.protocol.startsWith('http')) {
          shareData.url = window.location.href;
        }
        await navigator.share(shareData);
      } catch (err) {
        await fallbackCopy();
      }
    } else {
      await fallbackCopy();
    }
  };

  // --- Batch Flip Logic ---
  const handleBatchFlip = () => {
    const newResults: CoinSide[] = [];
    let h = 0;
    let t = 0;
    const count = Math.min(Math.max(1, batchCount), 10000); // Limit to 10k

    for (let i = 0; i < count; i++) {
      if (Math.random() < 0.5) {
        newResults.push(CoinSide.HEADS);
        h++;
      } else {
        newResults.push(CoinSide.TAILS);
        t++;
      }
    }
    setBatchResults(newResults);
    setBatchStats({ heads: h, tails: t });
  };

  const getFormattedBatchOutput = () => {
    return batchResults
      .map(r => r === CoinSide.HEADS ? customHeads : customTails)
      .join(separator.replace(/\\n/g, '\n')); // Allow \n for newline
  };

  const copyBatchResults = async () => {
    try {
      await navigator.clipboard.writeText(getFormattedBatchOutput());
      setCopyFeedback('Copied!');
      setTimeout(() => setCopyFeedback(''), 2000);
    } catch (e) {
      setCopyFeedback('Error');
    }
  };

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white overflow-y-auto font-sans">
      
      {/* Header */}
      <header className="w-full p-6 flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto z-10">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h1 className="text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-amber-600 drop-shadow-lg">
            Cosmic Coin Flip
          </h1>
          <p className="text-slate-400 text-xs tracking-wider uppercase mt-1">
            The Ultimate Coin Flip Tool
          </p>
        </div>
        
        {/* Mode Switcher */}
        <div className="flex bg-slate-900/50 p-1 rounded-lg border border-slate-700">
          <button
            onClick={() => setMode('single')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
              mode === 'single' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            3D Coin Flip
          </button>
          <button
            onClick={() => setMode('batch')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
              mode === 'batch' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Batch Flip
          </button>
        </div>
      </header>

      <main className="flex flex-col items-center w-full max-w-4xl z-10 pt-4 pb-20 px-4">
        
        {/* === SINGLE MODE === */}
        {mode === 'single' && (
          <div className="flex flex-col items-center w-full max-w-2xl">
            {/* Coin Selector */}
             <div className="mb-6 relative group z-20">
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

            <Coin isFlipping={isFlipping} result={result} rotation={rotation} coinDef={currentCoin} />

            {/* Status & Share */}
            <div className="min-h-[6rem] flex flex-col items-center justify-center mb-6 space-y-3">
              {isFlipping ? (
                <span className="text-3xl font-bold text-yellow-400 animate-pulse">Coin Flip in Progress...</span>
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
            <div className="w-full max-w-md space-y-4">
              
              {/* Question Input Removed for Vercel/SEO Focus */}
              
              <button
                onClick={handleFlip}
                disabled={isFlipping}
                className={`w-full relative group py-4 rounded-xl font-bold text-lg tracking-wider transition-all transform active:scale-[0.98]
                  ${isFlipping 
                    ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/30'
                  }`}
              >
                {isFlipping ? 'FLIPPING COIN...' : 'FLIP COIN'}
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
                className="w-full text-center text-xs text-slate-500 hover:text-slate-300 underline decoration-slate-600 hover:decoration-slate-400 underline-offset-4 transition-colors"
              >
                Reset Coin Flip Stats
              </button>
            </div>
            
             {/* History Feed */}
            <div className="w-full">
                <History history={history} />
            </div>
          </div>
        )}

        {/* === BATCH MODE === */}
        {mode === 'batch' && (
          <div className="flex flex-col items-center w-full animate-[fadeIn_0.5s_ease-out]">
            <h2 className="text-xl font-bold text-slate-200 mb-6 text-center">Bulk Coin Flip & Data Generator</h2>
            
            <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
              
              {/* Settings Panel */}
              <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700 h-fit">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-700 pb-2">Configuration</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Number of Flips (Max 10,000)</label>
                    <input 
                      type="number" 
                      min="1" 
                      max="10000"
                      value={batchCount}
                      onChange={(e) => setBatchCount(parseInt(e.target.value) || 0)}
                      className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Heads Text</label>
                      <input 
                        type="text" 
                        value={customHeads}
                        onChange={(e) => setCustomHeads(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        placeholder="Heads"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Tails Text</label>
                      <input 
                        type="text" 
                        value={customTails}
                        onChange={(e) => setCustomTails(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        placeholder="Tails"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Separator</label>
                    <input 
                      type="text" 
                      value={separator}
                      onChange={(e) => setSeparator(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono text-sm"
                      placeholder=", "
                    />
                    <p className="text-[10px] text-slate-500 mt-1">Tip: Use <code>\n</code> for new lines.</p>
                  </div>

                  <button
                    onClick={handleBatchFlip}
                    className="w-full mt-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-bold shadow-lg transition-all transform active:scale-[0.98]"
                  >
                    GENERATE COIN FLIPS
                  </button>
                </div>
              </div>

              {/* Results Panel */}
              <div className="flex flex-col space-y-4">
                
                {/* Stats Summary */}
                {batchResults.length > 0 && (
                   <div className="grid grid-cols-3 gap-2">
                     <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700 text-center">
                        <div className="text-[10px] text-slate-400 uppercase">Total</div>
                        <div className="text-lg font-bold text-white">{batchResults.length}</div>
                     </div>
                     <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700 text-center">
                        <div className="text-[10px] text-slate-400 uppercase">{customHeads}</div>
                        <div className="text-lg font-bold text-yellow-400">{batchStats.heads}</div>
                        <div className="text-[9px] text-slate-500">{((batchStats.heads/batchResults.length)*100).toFixed(1)}%</div>
                     </div>
                     <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700 text-center">
                        <div className="text-[10px] text-slate-400 uppercase">{customTails}</div>
                        <div className="text-lg font-bold text-slate-300">{batchStats.tails}</div>
                        <div className="text-[9px] text-slate-500">{((batchStats.tails/batchResults.length)*100).toFixed(1)}%</div>
                     </div>
                   </div>
                )}

                {/* Output Area */}
                <div className="flex-1 bg-slate-950 rounded-2xl border border-slate-700 relative overflow-hidden min-h-[300px] flex flex-col">
                  <div className="absolute top-0 left-0 right-0 bg-slate-900/90 border-b border-slate-800 p-2 flex justify-between items-center px-4">
                    <span className="text-xs font-mono text-slate-400">results.txt</span>
                    <div className="flex space-x-2">
                      <button 
                        onClick={copyBatchResults}
                        className="text-xs bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded text-slate-300 border border-slate-700 transition-colors"
                      >
                        {copyFeedback || 'Copy'}
                      </button>
                    </div>
                  </div>
                  <textarea 
                    readOnly
                    value={getFormattedBatchOutput()}
                    className="w-full h-full bg-transparent p-4 pt-12 text-slate-300 font-mono text-xs md:text-sm resize-none focus:outline-none"
                  />
                </div>

                {/* Export Buttons */}
                {batchResults.length > 0 && (
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => downloadFile(getFormattedBatchOutput(), 'coin-flip-results.txt', 'text/plain')}
                      className="flex items-center justify-center space-x-2 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-sm text-slate-300 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <span>Download .TXT</span>
                    </button>
                    <button 
                      onClick={() => {
                        // Create CSV content: Header then Data
                        const csvContent = `Flip Number,Result\n` + batchResults.map((r, i) => `${i+1},${r === CoinSide.HEADS ? customHeads : customTails}`).join('\n');
                        downloadFile(csvContent, 'coin-flip-results.csv', 'text/csv');
                      }}
                      className="flex items-center justify-center space-x-2 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-sm text-slate-300 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>Download CSV</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* SEO & Info Sections */}
      <div className="w-full bg-slate-900/40 border-t border-slate-800">
         <LandingSections />
      </div>
      
      <footer className="w-full py-8 text-center text-slate-600 text-sm border-t border-slate-800 bg-slate-950">
        <p>© {new Date().getFullYear()} Cosmic Coin Flip. All rights reserved.</p>
        <p className="mt-1 text-xs">The #1 Online Coin Flip Tool • Built with React</p>
      </footer>
    </div>
  );
};

export default App;