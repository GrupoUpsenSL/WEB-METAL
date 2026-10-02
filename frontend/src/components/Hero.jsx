import banner from '../assets/baner.webp';

export default function Hero() {
  return (
    <section id="inicio" className="bg-[#181614] text-white pt-8 pb-16 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div className="rounded-xl overflow-hidden shadow-2xl border-2 border-orange-600/40">
          <img 
            src={banner} 
            alt="Estructuras Metálicas Andrew - Pérgolas de hierro, Panel sandwich, Paneles Solares" 
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Especialistas en <span className="text-orange-500">Pérgolas de Hierro</span> y <span className="text-yellow-400">Cubiertas</span>
          </h2>
          <p className="text-stone-300 text-base sm:text-lg">
            Fabricación e instalación a medida de estructuras metálicas, cerramientos con panel sandwich y soportes para paneles solares.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <a
              href="#contacto"
              className="bg-orange-600 hover:bg-orange-500 text-white font-bold px-6 py-3 rounded-lg shadow-lg transition"
            >
              Solicitar Presupuesto
            </a>
            <a
              href="#servicios"
              className="bg-neutral-800 hover:bg-neutral-700 text-stone-200 border border-neutral-700 px-6 py-3 rounded-lg transition"
            >
              Ver Especialidades
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}