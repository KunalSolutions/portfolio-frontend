const HeroSection = () => {
  return (
    <section className="pb-32 md:pb-44 bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/bg-with-grid.png')] bg-cover bg-center bg-no-repeat">
      <div className="flex flex-col-reverse md:flex-row items-center gap-12 px-4 md:px-16 lg:px-24 xl:px-32 mt-16 md:mt-28">
        
        {/* LEFT CONTENT */}
        <div className="max-md:text-center">
          <h2 className="text-4xl md:text-6xl font-semibold max-w-xl bg-gradient-to-r from-slate-900 to-indigo-500 text-transparent bg-clip-text">
            I Build Modern Web Experiences
          </h2>

          <p className="mt-6 max-w-lg text-slate-600">
            I'm a full-stack web developer specializing in React, Tailwind CSS,
            Node.js, and MongoDB. I create fast, responsive, and scalable
            applications for the web.
          </p>

          <div className="flex max-md:justify-center gap-4 mt-8">
            <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition active:scale-95">
              View Projects
            </button>
            <button className="px-6 py-3 border border-indigo-400 text-indigo-600 rounded-md hover:bg-indigo-50 transition active:scale-95">
              Download CV
            </button>
          </div>

          {/* SOCIAL PROOF */}
          <div className="flex max-md:justify-center items-center mt-10 gap-4">
            <div className="flex -space-x-3">
              {[21, 22, 23, 24].map((i) => (
                <img
                  key={i}
                  src={`https://randomuser.me/api/portraits/men/${i}.jpg`}
                  alt=""
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
              ))}
            </div>
            <p className="text-sm text-slate-500">
              Trusted by startups & clients
            </p>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="w-full md:max-w-sm lg:max-w-lg">
          <img
            src="./Images/herosection.png"
            alt="Web Developer"
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
