import React from 'react';

export const LandingSections: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-6 pb-20 space-y-32 pt-24">
      
      {/* 1. Feature Grid: Why us? */}
      <section aria-labelledby="features-title">
        <div className="text-center mb-16">
          <h2 id="features-title" className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
            More Than Just a <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-amber-600">Coin Toss</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Experience the most realistic and feature-rich coin flipper on the web. Designed for fairness, speed, and utility.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon="🎲" 
            title="True Randomness" 
            desc="We use cryptographically secure algorithms to ensure every heads or tails result is unpredictable and mathematically fair."
          />
          <FeatureCard 
            icon="📊" 
            title="Batch Generator" 
            desc="Need data? Flip a coin 10,000 times in milliseconds. Perfect for statistics homework, probability research, or data modeling."
          />
          <FeatureCard 
            icon="🎨" 
            title="3D Immersion" 
            desc="Forget flat animations. Our physics-based 3D engine mimics the weight and spin of real currency from around the world."
          />
        </div>
      </section>

      {/* 2. Educational Content: The Math & History (Great for SEO) */}
      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-block px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-xs font-bold tracking-widest uppercase">
            The Science
          </div>
          <h3 className="text-3xl font-bold text-slate-100">The Probability of a Coin Flip</h3>
          <p className="text-slate-400 leading-relaxed">
            In an ideal scenario, a coin flip is a <strong>Bernoulli trial</strong> with a probability of exactly 50% for Heads and 50% for Tails. This makes it the universal symbol for unbiased binary decisions.
          </p>
          <p className="text-slate-400 leading-relaxed">
            However, physics studies show real coins might have a slight bias (approx 51%) towards the side they started on due to precession. Our <strong>digital coin flipper</strong> eliminates this physical bias, offering a mathematically perfect 50/50 chance every time.
          </p>
        </div>
        <div className="bg-slate-800/40 p-8 rounded-3xl border border-slate-700/50 backdrop-blur-sm relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
           <h4 className="text-lg font-bold text-indigo-300 mb-4">Did you know?</h4>
           <ul className="space-y-4 text-sm text-slate-300">
             <li className="flex gap-3">
               <span className="text-indigo-500 font-bold">•</span>
               <span>The Romans used coin flipping ("Navia aut Caput" - Ship or Head) to settle disputes and legal matters.</span>
             </li>
             <li className="flex gap-3">
               <span className="text-indigo-500 font-bold">•</span>
               <span>In the Super Bowl, the coin toss has correctly predicted the winner roughly 48% of the time—statistically irrelevant, but culturally massive.</span>
             </li>
             <li className="flex gap-3">
               <span className="text-indigo-500 font-bold">•</span>
               <span>A coin flip decided the name of Portland, Oregon. It could have been named Boston!</span>
             </li>
           </ul>
        </div>
      </section>

      {/* 3. Use Cases Grid */}
      <section>
        <h3 className="text-2xl font-bold text-slate-100 mb-8 flex items-center gap-3">
          <span className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center text-black text-sm font-bold">VS</span>
          Common Uses for Coin Flipping
        </h3>
        <div className="grid md:grid-cols-4 gap-4">
          <UseCaseCard title="Sports" desc="Who gets the ball first? Used in Football, Cricket, and Tennis." />
          <UseCaseCard title="Settling Debates" desc="End the argument about where to eat dinner instantly." />
          <UseCaseCard title="Gaming" desc="Determine critical hits or starting players in TTRPGs." />
          <UseCaseCard title="Education" desc="Teach students about probability, variance, and statistics." />
        </div>
      </section>

      {/* 4. Comprehensive FAQ (Schema Markup friendly structure) */}
      <section aria-labelledby="faq-title" className="bg-slate-900/50 rounded-3xl border border-slate-800 p-8 md:p-12">
        <h2 id="faq-title" className="text-3xl font-bold text-center mb-10 text-white">
          Frequently Asked Questions
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <DetailsItem 
              summary="Is this coin flipper truly random?" 
              content="Yes. Cosmic Coin Flip utilizes the browser's Crypto API (window.crypto.getRandomValues) which provides cryptographically strong random values, ensuring a true 50/50 distribution unlike simpler Math.random() implementations." 
            />
            <DetailsItem 
              summary="Why use an online flipper instead of a real coin?" 
              content="Real coins can get lost, are hard to see in video calls, and physically have slight biases based on weight distribution. Our online tool provides a perfect mathematical probability, works instantly on any device, and tracks your streak history automatically." 
            />
            <DetailsItem 
              summary="How many coins can I flip at once?" 
              content="In our 'Batch Flip' mode, you can generate up to 10,000 coin flips in a single click. This is ideal for statistical analysis where you need a large sample size (Law of Large Numbers) without the physical effort." 
            />
          </div>
          <div className="space-y-4">
            <DetailsItem 
              summary="Is the Heads or Tails result predetermined?" 
              content="No. The result is calculated the exact moment you click the 'Flip' button. There is no pre-set pattern or cycle. Every flip is an independent event with equal odds." 
            />
            <DetailsItem 
              summary="Can I customize the coin?" 
              content="Yes! You can choose between US Dollar, Euro, Yuan, Yen, Bitcoin, and even an Ancient coin style. In Batch mode, you can also rename 'Heads' and 'Tails' to custom text like 'Yes/No' or 'Team A/Team B'." 
            />
            <DetailsItem 
              summary="Is this tool free?" 
              content="100% Free. There are no limits on how many times you can flip, and no login is required to access advanced features like statistics export or CSV downloading." 
            />
          </div>
        </div>
      </section>

      {/* 5. CTA Bottom */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-slate-200 mb-4">Ready to test your luck?</h3>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="px-8 py-3 bg-white text-slate-900 font-bold rounded-full hover:bg-indigo-50 transition-colors shadow-lg shadow-white/10"
        >
          Flip Coin Now
        </button>
      </div>

    </div>
  );
};

// Sub-components for cleaner code
const FeatureCard: React.FC<{ icon: string; title: string; desc: string }> = ({ icon, title, desc }) => (
  <div className="bg-slate-800/30 p-8 rounded-2xl border border-slate-700 hover:bg-slate-800/50 hover:border-indigo-500/30 transition duration-300 group">
    <div className="w-14 h-14 bg-slate-700/50 rounded-xl flex items-center justify-center mb-6 text-3xl shadow-inner group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-100 mb-3">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
  </div>
);

const UseCaseCard: React.FC<{ title: string; desc: string }> = ({ title, desc }) => (
  <div className="bg-slate-800/40 p-5 rounded-xl border border-slate-700 hover:border-amber-500/50 transition duration-300">
    <h4 className="font-bold text-indigo-300 mb-2">{title}</h4>
    <p className="text-xs text-slate-400">{desc}</p>
  </div>
);

const DetailsItem: React.FC<{ summary: string; content: string }> = ({ summary, content }) => (
  <details className="group bg-slate-800/40 rounded-xl border border-slate-700/50 open:bg-slate-800 open:border-indigo-500/50 transition-all duration-300">
    <summary className="flex items-center justify-between p-4 cursor-pointer font-semibold text-slate-200 hover:text-white select-none">
      {summary}
      <span className="transform group-open:rotate-180 transition-transform duration-300 text-slate-500 group-open:text-indigo-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </span>
    </summary>
    <div className="px-4 pb-4 text-slate-400 text-sm leading-relaxed border-t border-slate-700/0 group-open:border-slate-700/50 pt-0 group-open:pt-4 transition-all">
      {content}
    </div>
  </details>
);