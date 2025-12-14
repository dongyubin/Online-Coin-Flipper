import React from 'react';

export const LandingSections: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-6 pb-20 space-y-24 pt-20">
      
      {/* Features Section */}
      <section aria-labelledby="features-title">
        <h2 id="features-title" className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
          Why Use Cosmic Coin Flipper?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 hover:border-indigo-500/50 transition duration-300">
            <div className="w-12 h-12 bg-indigo-500/20 rounded-lg flex items-center justify-center mb-4 text-indigo-400 text-2xl">⚡</div>
            <h3 className="text-xl font-semibold mb-2 text-slate-200">Instant & Fair</h3>
            <p className="text-slate-400 leading-relaxed">
              True randomness powered by cryptographically secure algorithms. No bias, just pure physics simulation.
            </p>
          </div>
          <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 hover:border-purple-500/50 transition duration-300">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 text-purple-400 text-2xl">🤖</div>
            <h3 className="text-xl font-semibold mb-2 text-slate-200">AI Interpretations</h3>
            <p className="text-slate-400 leading-relaxed">
              Ask a question and let our Gemini-powered AI oracle interpret the coin toss for your specific dilemma.
            </p>
          </div>
          <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 hover:border-amber-500/50 transition duration-300">
            <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center mb-4 text-amber-400 text-2xl">🌍</div>
            <h3 className="text-xl font-semibold mb-2 text-slate-200">Global Currencies</h3>
            <p className="text-slate-400 leading-relaxed">
              Flip the US Dollar, Euro, or even Bitcoin. Visualize your luck in your preferred currency style.
            </p>
          </div>
        </div>
      </section>

      {/* How it Works (SEO Text) */}
      <section className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800">
        <h2 className="text-2xl font-bold mb-6 text-slate-200">How to Flip a Coin Online</h2>
        <ol className="list-decimal list-inside space-y-4 text-slate-400">
          <li><strong className="text-slate-300">Select your coin:</strong> Choose between USD, Euro, Yen, or Bitcoin from the dropdown menu.</li>
          <li><strong className="text-slate-300">Ask a question (Optional):</strong> Type in a yes/no question to get an AI interpretation.</li>
          <li><strong className="text-slate-300">Click Flip:</strong> Tap the button or click the coin to start the 3D animation.</li>
          <li><strong className="text-slate-300">See the result:</strong> View your Heads or Tails result and read the cosmic advice.</li>
        </ol>
      </section>

      {/* FAQ Section */}
      <section aria-labelledby="faq-title">
        <h2 id="faq-title" className="text-3xl font-bold text-center mb-10 text-slate-200">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <DetailsItem 
            summary="Is this coin flipper truly random?" 
            content="Yes! We use the browser's crypto.randomUUID() and Math.random() functions to ensure the result is as unpredictable as a real coin toss." 
          />
          <DetailsItem 
            summary="What is the probability of Heads or Tails?" 
            content="Just like a real physical coin, the probability is exactly 50/50 over a large number of flips. It is an unbiased Bernoulli trial." 
          />
          <DetailsItem 
            summary="Can I use this for settling disputes?" 
            content="Absolutely. Our Coin Flipper is unbiased and can be used to settle bets, make decisions, or resolve disputes fairly." 
          />
           <DetailsItem 
            summary="Is the AI advice real fortune telling?" 
            content="The AI generates fun, witty responses based on your coin flip result. While entertaining, it should be used for fun and not major life decisions!" 
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
