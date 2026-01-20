import { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-white/30 bg-transparent">
      <nav className="flex items-center justify-between px-4 py-4 md:px-16 lg:px-24 xl:px-32">
        
        {/* LOGO */}
        <h1 className="text-2xl font-bold text-indigo-600">
          Kunal<span className="text-slate-900">.</span>
        </h1>

        {/* MENU */}
        <ul
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-white/80 backdrop-blur transition-transform duration-300 
          ${menuOpen ? "translate-x-0" : "-translate-x-full"} 
          md:static md:flex md:flex-row md:translate-x-0 md:bg-transparent md:backdrop-blur-0`}
        >
          {["Home", "About", "Projects", "Skills", "Contact"].map((item) => (
            <li key={item}>
              <a
                href="#"
                onClick={() => setMenuOpen(false)}
                className="text-base font-medium hover:text-indigo-600 transition"
              >
                {item}
              </a>
            </li>
          ))}

          {/* CLOSE BUTTON */}
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 md:hidden text-2xl"
          >
            ✕
          </button>
        </ul>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>

        {/* CTA */}
        <button className="hidden md:block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition">
          Hire Me
        </button>
      </nav>
    </header>
  );
};

export default Header;
