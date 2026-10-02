import logo from '../assets/LOGO ANDREWS.jpg';

export default function Navbar() {
  return (
    <header className="bg-[#12100e] text-white sticky top-0 z-50 border-b border-orange-600/30 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <a href="#inicio" className="flex items-center gap-3">
          <img 
            src={logo} 
            alt="Andrew Logo" 
            className="h-10 w-auto object-contain rounded bg-white p-0.5"
          />
          <div className="hidden sm:block">
            <span className="font-extrabold text-orange-500 text-base leading-none block">
              ANDREW
            </span>
            <span className="text-xs text-stone-400 font-medium">Estructuras Metálicas</span>
          </div>
        </a>

        <nav className="hidden md:flex space-x-6 text-sm font-semibold text-stone-300">
          <a href="#inicio" className="hover:text-orange-500 transition">Inicio</a>
          <a href="#servicios" className="hover:text-orange-500 transition">Servicios</a>
          <a href="#proyectos" className="hover:text-orange-500 transition">Proyectos</a>
          <a href="#contacto" className="hover:text-orange-500 transition">Contacto</a>
        </nav>

        <a
          href="#contacto"
          className="bg-orange-600 hover:bg-orange-500 text-white font-bold px-4 py-2 rounded-md text-sm transition shadow-sm"
        >
          Pedir Presupuesto
        </a>
      </div>
    </header>
  );
}