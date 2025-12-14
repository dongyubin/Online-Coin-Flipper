import React from 'react';

export const LandingSections: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-6 pb-20 space-y-24 pt-20">
      
      {/* Features Section */}
      <section aria-labelledby="features-title">
        <h2 id="features-title" className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
          The Best Online Coin Flip Tool
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 hover:border-indigo-500/50 transition duration-300">
            <div className="w-12 h-12 bg-indigo-500/20 rounded-lg flex items-center justify-center mb-4 text-indigo-400 text-2xl">📊</div>
            <h3 className="text-xl font-semibold mb-2 text-slate-200">Bulk Coin Flip</h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              Need to flip a coin 100 times? Use our Batch Coin Flip mode to generate massive results instantly. Export to CSV.
            </p>
          </div>
          <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 hover:border-purple-500/50 transition duration-300">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 text-purple-400 text-2xl">⚙️</div>
            <h3 className="text-xl font-semibold mb-2 text-slate-200">Custom Coin Flip</h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              Customize your coin flip. Replace "Heads" with "Yes" and "Tails" with "No". The ultimate coin flip generator.
            </p>
          </div>
          <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 hover:border-amber-500/50 transition duration-300">
            <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center mb-4 text-amber-400 text-2xl">⚡</div>
            <h3 className="text-xl font-semibold mb-2 text-slate-200">3D Coin Flip</h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              Experience the best online 3D coin flip animation. Realistic physics make every flip of the coin feel authentic.
            </p>
          </div>
        </div>
      </section>

      {/* How it Works (SEO Text) */}
      <section className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800">
        <h2 className="text-2xl font-bold mb-6 text-slate-200">Why Use This Online Coin Flip?</h2>
        <div className="grid md:grid-cols-2 gap-8 text-slate-400 text-sm">
            <div>
                <h3 className="text-slate-200 font-semibold mb-2 text-lg">Probability & Statistics</h3>
                <p className="mb-4">
                    Our <strong className="text-indigo-400">Coin Flip</strong> simulator is perfect for students learning about probability. Flip a coin 1,000 times to see the law of large numbers in action.
                </p>
                <h3 className="text-slate-200 font-semibold mb-2 text-lg">Gaming & RPGs</h3>
                <p>
                    Need a quick heads or tails result? Our online coin flip is the fastest way to decide who goes first or determine critical hits in your favorite games.
                </p>
            </div>
            <div>
                <h3 className="text-slate-200 font-semibold mb-2 text-lg">Instant Decision Maker</h3>
                <p className="mb-4">
                    Can't decide? Let the coin flip decide for you. It is a completely unbiased random number generator visualized as a simple coin toss.
                </p>
                <h3 className="text-slate-200 font-semibold mb-2 text-lg">Data Export</h3>
                <p>
                    Researchers can use the bulk coin flip feature to download datasets. Generate a random sequence of heads and tails for your projects.
                </p>
            </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section aria-labelledby="faq-title">
        <h2 id="faq-title" className="text-3xl font-bold text-center mb-10 text-slate-200">
          Coin Flip FAQ
        </h2>
        <div className="space-y-4">
          <DetailsItem 
            summary="Is this Coin Flip truly random?" 
            content="Yes, our Coin Flip generator uses cryptographically secure pseudo-random number generators (PRNG) to ensure every flip of the coin is 100% fair and unbiased." 
          />
          <DetailsItem 
            summary="How many times can I flip a coin at once?" 
            content="With our Batch Coin Flip feature, you can flip a coin up to 10,000 times instantly. The standard 3D Coin Flip mode flips one coin at a time for realism." 
          />
          <DetailsItem 
            summary="Can I customize the Coin Flip results?" 
            content="Absolutely. In Batch mode, you can change 'Heads' and 'Tails' to any text you want, making this a versatile decision-making tool beyond just a standard coin flip." 
          />
           <DetailsItem 
            summary="Is this Online Coin Flip free?" 
            content="Yes, this Online Coin Flip tool is completely free to use. Flip a coin as many times as you like without any restrictions." 
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