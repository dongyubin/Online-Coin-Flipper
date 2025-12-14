import React from 'react';
import { CoinSide, CoinDefinition } from '../types';

interface CoinProps {
  isFlipping: boolean;
  result: CoinSide;
  rotation: number;
  coinDef: CoinDefinition;
}

const Coin: React.FC<CoinProps> = ({ isFlipping, result, rotation, coinDef }) => {
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto my-12 select-none">
      
      {/* 3D Space */}
      <div className="perspective-container w-full h-full z-20 relative">
        {/* Bounce Wrapper (Y-axis translation) */}
        <div className={`coin-toss-wrapper ${isFlipping ? 'animate-toss' : ''}`}>
          
          {/* Spin Wrapper (Rotational transition) */}
          <div
            className="coin-inner"
            style={{
              transform: `rotateY(${rotation}deg)`,
            }}
          >
            {/* Front Side (Heads) */}
            <div 
              className={`coin-face coin-front border-4 ${coinDef.borderColor}`}
              style={{ background: coinDef.frontColor }}
            >
              <div className={`flex flex-col items-center justify-center space-y-2 ${coinDef.textColor}`}>
                {coinDef.frontContent}
                <span className="text-3xl font-bold tracking-widest uppercase drop-shadow-sm mt-2">Heads</span>
              </div>
            </div>

            {/* Back Side (Tails) */}
            <div 
              className={`coin-face coin-back border-4 ${coinDef.borderColor}`}
              style={{ background: coinDef.backColor }}
            >
              <div className={`flex flex-col items-center justify-center space-y-2 ${coinDef.textColor}`}>
                {coinDef.backContent}
                <span className="text-3xl font-bold tracking-widest uppercase drop-shadow-sm mt-2">Tails</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Shadow */}
      <div 
        className={`absolute bottom-[-40px] left-1/2 -translate-x-1/2 w-48 h-8 bg-black/40 blur-xl rounded-[100%] z-10 transition-opacity duration-300 ${isFlipping ? 'animate-shadow' : 'opacity-30'}`}
      ></div>
    </div>
  );
};

export default Coin;