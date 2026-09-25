
const HeroBaner = () => {
  return (
    <div
      className="hero "
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop)",
      }}
    >
      <div className="hero-overlay bg-black/50"></div>

      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-2xl">

          <h1 className="mb-5 text-5xl font-bold">
            Find Your Perfect Home
          </h1>

          <p className="mb-6 text-lg">
            Discover comfortable rooms and compatible roommates
            in your preferred location and budget.
          </p>

       
        
          </div>

        </div>
      </div>

  );
};

export default HeroBaner;

