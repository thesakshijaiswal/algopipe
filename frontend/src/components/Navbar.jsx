export const Navbar = () => {
  return (
    <div className="h-16 shadow-lg flex items-center justify-between">
      <div className="flex items-center">
        <img src="/pipe_logo.png" alt="Logo" className="h-12 w-auto ml-4" />
        <h1 className="font-bold text-2xl text-violet-700 tracking-wide ml-3">
          ALGOPIPE
        </h1>
      </div>
      <button className="bg-gradient-to-tl from-violet-400 to-violet-700 text-white rounded-s-xl px-6 mr-4 py-2 font-bold text-sm md:block hidden">
        GET STARTED
      </button>
    </div>
  );
};
