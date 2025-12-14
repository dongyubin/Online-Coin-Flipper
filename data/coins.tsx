import React from 'react';
import { CoinDefinition } from '../types';

export const COIN_TYPES: CoinDefinition[] = [
  {
    id: 'usd',
    name: 'US Dollar',
    country: 'USA',
    frontColor: 'linear-gradient(135deg, #fbbf24, #d97706)', // Gold
    backColor: 'linear-gradient(135deg, #cbd5e1, #64748b)', // Silverish
    borderColor: 'border-yellow-600',
    textColor: 'text-yellow-900',
    frontContent: (
      <div className="flex flex-col items-center">
        <span className="text-6xl font-serif font-bold">$</span>
        <span className="text-xs font-bold tracking-[0.2em] mt-2">LIBERTY</span>
      </div>
    ),
    backContent: (
      <div className="flex flex-col items-center">
        <span className="text-4xl font-bold font-serif">1</span>
        <span className="text-[10px] font-bold uppercase tracking-widest mt-1">Dollar</span>
        <div className="w-12 h-1 bg-slate-400/30 rounded-full mt-2"></div>
      </div>
    )
  },
  {
    id: 'cny',
    name: 'Yuan (RMB)',
    country: 'China',
    frontColor: 'linear-gradient(135deg, #e2e8f0, #cbd5e1)', // Silver
    backColor: 'linear-gradient(135deg, #e2e8f0, #94a3b8)', // Silver Darker
    borderColor: 'border-slate-400',
    textColor: 'text-slate-700',
    frontContent: (
      <div className="flex flex-col items-center">
        <span className="text-5xl font-sans font-bold tracking-tighter">1元</span>
        <span className="text-[10px] font-bold tracking-widest mt-1 uppercase">Yi Yuan</span>
      </div>
    ),
    backContent: (
      <div className="flex flex-col items-center justify-center h-full">
         <span className="text-[10px] font-bold scale-75 mb-1">ZHONGGUO RENMIN YINHANG</span>
         <div className="w-16 h-16 border-2 border-slate-400/30 rounded-full flex items-center justify-center">
            {/* Simple Flower Representation */}
            <div className="w-10 h-10 bg-slate-300/50 rounded-full rotate-45 transform"></div>
         </div>
         <span className="text-[10px] font-bold mt-2">2024</span>
      </div>
    )
  },
  {
    id: 'eur',
    name: 'Euro',
    country: 'EU',
    frontColor: 'linear-gradient(135deg, #fcd34d, #b45309)', // Gold/Bronze mix
    backColor: 'linear-gradient(135deg, #fcd34d, #b45309)',
    borderColor: 'border-yellow-700',
    textColor: 'text-yellow-950',
    frontContent: (
      <div className="flex flex-col items-center">
        <span className="text-6xl font-sans font-bold">€</span>
        <span className="text-[10px] font-bold tracking-widest mt-2 opacity-70">EUROPE</span>
      </div>
    ),
    backContent: (
      <div className="flex flex-col items-center border-4 border-dashed border-yellow-900/20 rounded-full w-24 h-24 justify-center">
         <span className="text-4xl font-bold">1</span>
         <span className="text-[8px] uppercase">Euro</span>
      </div>
    )
  },
  {
    id: 'btc',
    name: 'Bitcoin',
    country: 'Crypto',
    frontColor: 'linear-gradient(135deg, #f97316, #ea580c)', // Orange
    backColor: 'linear-gradient(135deg, #f97316, #c2410c)',
    borderColor: 'border-orange-600',
    textColor: 'text-white',
    frontContent: (
      <div className="flex flex-col items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-5.71h-.001c-.487.033-1.094.147-1.716.216l.462-1.928a.39.39 0 0 0-.279-.47l-1.42-.34a.39.39 0 0 0-.47.28l-.462 1.927c-.6.16-1.196.26-1.783.228l.477-1.99a.39.39 0 0 0-.28-.47l-1.42-.34a.39.39 0 0 0-.47.28l-.482 2.013c-.568.125-1.125.132-1.638.006a.39.39 0 0 0-.46.28l-.34 1.42a.39.39 0 0 0 .28.47l2.067.495c.576.138.834.695.696 1.272l-1.353 5.642c-.138.576-.695.834-1.272.696l-2.067-.496a.39.39 0 0 0-.47.28l-.34 1.42a.39.39 0 0 0 .28.47l2.054.492c.575.138 1.15.176 1.708.12l-.488 2.036a.39.39 0 0 0 .28.47l1.42.34a.39.39 0 0 0 .47-.28l.462-1.928c.616.096 1.223.13 1.81.077l-.462 1.928a.39.39 0 0 0 .28.47l1.42.34a.39.39 0 0 0 .47-.28l.476-1.986c4.994.463 6.643-4.777 1.63-5.978zm-1.882-3.085l.775-3.235c2.396.574 2.876 3.655.48 4.23l-.775 3.236c-2.395-.574-2.875-3.655-.48-4.23z"/></svg>
      </div>
    ),
    backContent: (
      <div className="flex flex-col items-center">
         <div className="grid grid-cols-3 gap-1 opacity-50">
            {[...Array(9)].map((_, i) => <div key={i} className="w-2 h-2 bg-white rounded-full" />)}
         </div>
         <span className="text-[10px] mt-2 font-mono">DECENTRALIZED</span>
      </div>
    )
  },
  {
    id: 'jpn',
    name: 'Yen',
    country: 'Japan',
    frontColor: 'linear-gradient(135deg, #e2e8f0, #94a3b8)', // Silver/Aluminum
    backColor: 'linear-gradient(135deg, #e2e8f0, #cbd5e1)',
    borderColor: 'border-slate-300',
    textColor: 'text-slate-800',
    frontContent: (
      <div className="flex flex-col items-center">
        <span className="text-5xl font-bold">¥</span>
        <span className="text-xs font-bold mt-1">NIPPON</span>
      </div>
    ),
    backContent: (
      <div className="flex flex-col items-center">
        <span className="text-4xl font-bold">1</span>
        <div className="w-full text-[8px] tracking-tighter mt-1">平成二十年</div>
      </div>
    )
  },
  {
    id: 'ancient',
    name: 'Ancient',
    country: 'Empire',
    frontColor: 'linear-gradient(135deg, #b45309, #78350f)', // Dark Bronze
    backColor: 'linear-gradient(135deg, #92400e, #451a03)',
    borderColor: 'border-orange-900',
    textColor: 'text-orange-200',
    frontContent: (
      <div className="flex flex-col items-center opacity-80">
        <div className="w-16 h-16 border-2 border-orange-400/50 rounded-full flex items-center justify-center">
          <span className="text-4xl font-serif">♔</span>
        </div>
      </div>
    ),
    backContent: (
      <div className="flex flex-col items-center opacity-80">
        <span className="text-3xl">⚔️</span>
      </div>
    )
  }
];