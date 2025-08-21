// src/components/common/FullPageLoader.jsx
const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-grid-move"></div>
      </div>

      {/* Main loader container */}
      <div className="relative flex flex-col items-center">
        {/* Rotating rings */}
        <div className="relative h-32 w-32">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-spin-slow"></div>
          
          {/* Middle ring */}
          <div className="absolute inset-2 rounded-full border-2 border-l-white border-t-transparent border-r-transparent border-b-transparent animate-spin-medium"></div>
          
          {/* Inner ring */}
          <div className="absolute inset-4 rounded-full border-2 border-r-gray-400 border-t-transparent border-l-transparent border-b-transparent animate-spin-fast"></div>
          
          {/* Center dot */}
          <div className="absolute top-1/2 left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white animate-pulse-smooth"></div>
          
          {/* Moving dots around the rings */}
          <div className="absolute inset-0 animate-spin-slow">
            <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-gray-300"></div>
          </div>
          
          <div className="absolute inset-2 animate-spin-reverse">
            <div className="absolute -top-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white"></div>
          </div>
        </div>

        {/* Moving bars loader */}
        <div className="mt-12 flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-1 bg-gray-400 rounded-full animate-bar-wave"
              style={{
                height: '40px',
                animationDelay: `${i * 0.1}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Sliding text */}
        <div className="mt-8 overflow-hidden w-48 h-8">
          <div className="flex animate-text-slide">
            <span className="text-lg font-mono text-white/80 tracking-[0.3em] whitespace-nowrap">
              LOADING...
            </span>
            <span className="text-lg font-mono text-white/80 tracking-[0.3em] whitespace-nowrap ml-12">
              LOADING...
            </span>
          </div>
        </div>

        {/* Expanding circles */}
        <div className="mt-8 relative h-16 w-48">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30 animate-expand"
              style={{
                animationDelay: `${i * 0.6}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Progress line */}
        <div className="mt-6 w-64 h-0.5 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full w-1/3 bg-white rounded-full animate-progress-slide"></div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute h-1 w-1 bg-white/20 rounded-full animate-float-random"
            style={{
              left: `${10 + (i * 5)}%`,
              top: `${20 + (i * 4)}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${4 + (i % 3)}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default PageLoader;
