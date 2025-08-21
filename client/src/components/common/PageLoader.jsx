// src/components/common/FullPageLoader.jsx
const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute h-2 w-2 rounded-full bg-white/20 animate-sparkle`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main loading container */}
      <div className="relative flex flex-col items-center">
        {/* Ripple effects behind the orb */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-40 w-40 rounded-full bg-indigo-500/20 animate-ripple"></div>
          <div className="absolute h-40 w-40 rounded-full bg-purple-500/20 animate-ripple-delayed"></div>
          <div className="absolute h-40 w-40 rounded-full bg-cyan-500/20 animate-ripple-slow"></div>
        </div>

        {/* The main floating orb with enhanced gradients */}
        <div className="relative z-10 h-40 w-40 animate-float">
          {/* Inner glowing core */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 animate-pulse-slow blur-sm"></div>
          
          {/* Main orb */}
          <div className="h-full w-full rounded-full bg-gradient-to-br from-indigo-500/80 via-purple-500/60 to-cyan-500/80 shadow-2xl shadow-indigo-500/30 animate-rotate-slow">
            {/* Inner highlight */}
            <div className="absolute top-8 left-8 h-8 w-8 rounded-full bg-white/40 blur-md"></div>
          </div>
          
          {/* Orbiting elements */}
          <div className="absolute inset-0 animate-spin-slow">
            <div className="absolute -top-2 left-1/2 h-4 w-4 rounded-full bg-cyan-400/70 shadow-lg shadow-cyan-400/50 transform -translate-x-1/2"></div>
            <div className="absolute top-1/2 -right-2 h-3 w-3 rounded-full bg-purple-400/70 shadow-lg shadow-purple-400/50 transform -translate-y-1/2"></div>
            <div className="absolute -bottom-2 left-1/2 h-2 w-2 rounded-full bg-indigo-400/70 shadow-lg shadow-indigo-400/50 transform -translate-x-1/2"></div>
          </div>
        </div>

        {/* Enhanced loading text */}
        <div className="mt-16 text-center">
          <div className="flex items-center space-x-1">
            {['L', 'O', 'A', 'D', 'I', 'N', 'G'].map((letter, i) => (
              <span
                key={i}
                className="text-2xl font-light tracking-widest text-white/80 animate-bounce-delayed"
                style={{
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                {letter}
              </span>
            ))}
          </div>
          
          {/* Animated dots */}
          <div className="mt-4 flex justify-center space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse-sequence"
                style={{
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-8 w-64 h-1 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 animate-progress rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
