import React from 'react';

export const LandingSections: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-6 pb-20 space-y-24 pt-20">
      
      {/* Features Section */}
      <section aria-labelledby="features-title">
        <h2 id="features-title" className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
          The Most Versatile Coin Flip Tool
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 hover:border-indigo-500/50 transition duration-300">
            <div className="w-12 h-12 bg-indigo-500/20 rounded-lg flex items-center justify-center mb-4 text-indigo-400 text-2xl">📊</div>
            <h3 className="text-xl font-semibold mb-2 text-slate-200">Bulk Generator</h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              Need 100 or 1,000 flips? Use our Batch Mode to generate massive datasets instantly. Export to CSV or Text.
            </p>
          </div>
          <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 hover:border-purple-500/50 transition duration-300">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 text-purple-400 text-2xl">⚙️</div>
            <h3 className="text-xl font-semibold mb-2 text-slate-200">Fully Custom</h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              Customize your results. Replace "Heads" with "Yes/Win" and "Tails" with "No/Lose". Set your own separators.
            </p>
          </div>
          <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 hover:border-amber-500/50 transition duration-300">
            <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center mb-4 text-amber-400 text-2xl">⚡</div>
            <h3 className="text-xl font-semibold mb-2 text-slate-200">3D Realism</h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              For single decisions, enjoy our physics-based 3D animation with AI-powered interpretations of your fate.
            </p>
          </div>
        </div>
      </section>

      {/* How it Works (SEO Text) */}
      <section className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800">
        <h2 className="text-2xl font-bold mb-6 text-slate-200">Practical Uses for Coin Flipper</h2>
        <div className="grid md:grid-cols-2 gap-8 text-slate-400 text-sm">
            <div>
                <h3 className="text-slate-200 font-semibold mb-2 text-lg">Probability Statistics</h3>
                <p className="mb-4">
                    Students and teachers can use the <strong className="text-indigo-400">Batch Flip</strong> feature to demonstrate the Law of Large Numbers. Run 1,000 flips and see how closely the ratio approaches 50/50.
                </p>
                <h3 className="text-slate-200 font-semibold mb-2 text-lg">Game Masters & RPGs</h3>
                <p>
                    Need to determine the outcome for a crowded battlefield? Generate 50 results at once with custom "Hit/Miss" text to speed up your tabletop gameplay.
                </p>
            </div>
            <div>
                <h3 className="text-slate-200 font-semibold mb-2 text-lg">Decision Making</h3>
                <p className="mb-4">
                    Stuck between two choices? Flip a coin online to break the deadlock. It's unbiased, quick, and now supports custom text for specific scenarios.
                </p>
                <h3 className="text-slate-200 font-semibold mb-2 text-lg">Data Export</h3>
                <p>
                    Researchers and developers can download coin flip datasets in CSV or TXT format for use in simulations, testing algorithms, or Excel analysis.
                </p>
            </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section aria-labelledby="faq-title">
        <h2 id="faq-title" className="text-3xl font-bold text-center mb-10 text-slate-200">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <DetailsItem 
            summary="How many coins can I flip at once?" 
            content="In Batch Mode, you can flip up to 10,000 coins instantly. For the 3D animation mode, we stick to one coin at a time to ensure high-quality visual performance." 
          />
          <DetailsItem 
            summary="Can I change the output text for Heads and Tails?" 
            content="Yes! In Batch Mode, you can define custom 'Heads Text' (e.g., 'Team A') and 'Tails Text' (e.g., 'Team B') to match your specific needs." 
          />
           <DetailsItem 
            summary="How do I export the coin flip results?" 
            content="After generating a batch of flips, buttons will appear allowing you to Copy to Clipboard, Download as .TXT, or Download as .CSV for spreadsheet software." 
          />
          <DetailsItem 
            summary="Is the randomness truly fair?" 
            content="Absolutely. We use cryptographically secure pseudo-random number generators (PRNG) provided by the browser to ensure every flip is unbiased." 
          />
        </div>
      </section>

    </div>
  );
};

const DetailsItem: React.FC<{ summary: string; content: string }> = ({ summary, content }) => (
  <details className="group bg-slate-800 rounded-lg border border-slate-700 open:border-indigo-500/50 transition-all duration-300">
    <summary className="flex items-center justify-between p-5 cursor-pointer font-medium text-slate-200 hover:text-white">
      {summary}
      <span className="transform group-open:rotate-180 transition-transform duration-300 text-indigo-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </span>
    </summary>
    <div className="px-5 pb-5 text-slate-400 leading-relaxed border-t border-slate-700/50 pt-4 mt-2">
      {content}
    </div>
  </details>
);