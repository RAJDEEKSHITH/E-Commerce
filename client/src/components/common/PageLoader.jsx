// src/components/common/FullPageLoader.jsx

const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">
      {/* The floating orb */}
      <div className="h-40 w-40 animate-float rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/70 to-transparent"></div>

      {/* The text */}
      <p className="mt-12 text-xl tracking-widest text-white/70 animate-pulse">
        LOADING
      </p>
    </div>
  );
};

export default PageLoader;