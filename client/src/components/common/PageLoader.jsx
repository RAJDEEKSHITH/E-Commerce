// src/components/common/FullPageLoader.jsx
const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden">
      
      {/* Spinning Rings */}
      <div className="relative h-24 w-24 mb-8">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-spin-slow"></div>
        
        {/* Inner ring */}
        <div className="absolute inset-2 rounded-full border-2 border-l-white border-r-transparent border-t-transparent border-b-transparent animate-spin-reverse"></div>
        
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white animate-pulse-smooth"></div>
      </div>

      {/* Moving Bars */}
      <div className="flex space-x-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-1 h-8 bg-gray-400 rounded-full animate-bar-wave"
            style={{ animationDelay: `${i * 0.1}s` }}
          ></div>
        ))}
      </div>

      {/* Loading Text */}
      <div className="text-white/80 text-lg font-mono tracking-widest mb-6 animate-text-glow">
        LOADING...
      </div>

      {/* Progress Bar */}
      <div className="w-48 h-0.5 bg-gray-800 rounded-full overflow-hidden">
        <div className="h-full w-1/3 bg-white rounded-full animate-slide-progress"></div>
      </div>

      {/* Floating Particles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute h-1 w-1 bg-white/30 rounded-full animate-float-particle"
          style={{
            left: `${15 + (i * 10)}%`,
            top: `${20 + (i * 8)}%`,
            animationDelay: `${i * 0.5}s`,
          }}
        ></div>
      ))}
    </div>
  );
};

export default PageLoader;
