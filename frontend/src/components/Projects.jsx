import { useState } from 'react';

import imgPergolaHierro from '../assets/1.png';
import imgGalvanizada from '../assets/2.png';
import imgSandwich from '../assets/4.png';
import imgSolarSandwich from '../assets/5.png';
import imgEstructuraSolar from '../assets/6.png';
import imgParking from '../assets/8.png';
import imgSandwichTeja from '../assets/9.png';
import imgSolarEstructura from '../assets/10.png';
import imgSandwichRoja from '../assets/11.png';
import imgPuerta from '../assets/Puerta.png';

export default function Projects() {
  const [categoriaActiva, setCategoriaActiva] = useState('Todos');

  const categorias = [
    'Todos',
    'Pérgolas',
    'Panel Sandwich',
    'Energía Solar',
    'Carpintería Metálica'
  ];

  const trabajos = [
    {
      img: imgPergolaHierro,
      titulo: 'Pérgola de hierro',
      categoria: 'Pérgolas'
    },
    {
      img: imgGalvanizada,
      titulo: 'Pérgola de hierro galvanizada',
      categoria: 'Pérgolas'
    },
    {
      img: imgParking,
      titulo: 'Pérgola galvanizada para parking',
      categoria: 'Pérgolas'
    },
    {
      img: imgSandwich,
      titulo: 'Estructura + Panel Sandwich',
      categoria: 'Panel Sandwich'
    },
    {
      img: imgSandwichTeja,
      titulo: 'Panel Sandwich tipo teja',
      categoria: 'Panel Sandwich'
    },
    {
      img: imgSandwichRoja,
      titulo: 'Estructura + Panel Sandwich (Cubierta)',
      categoria: 'Panel Sandwich'
    },
    {
      img: imgSolarSandwich,
      titulo: 'Estructura + Panel Sandwich + Panel Solar',
      categoria: 'Energía Solar'
    },
    {
      img: imgEstructuraSolar,
      titulo: 'Estructura metálica para paneles solares',
      categoria: 'Energía Solar'
    },
    {
      img: imgSolarEstructura,
      titulo: 'Soporte metálico para placas solares',
      categoria: 'Energía Solar'
    },
    {
      img: imgPuerta,
      titulo: 'Instalación de Puertas y Cerramientos',
      categoria: 'Carpintería Metálica'
    }
  ];

  const trabajosFiltrados = categoriaActiva === 'Todos'
    ? trabajos
    : trabajos.filter(t => t.categoria === categoriaActiva);

  return (
    <section id="proyectos" className="py-16 bg-[#1a1816] text-white border-t border-stone-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-3xl font-extrabold text-white">
            Nuestros <span className="text-orange-500">Trabajos Realizados</span>
          </h2>
          <p className="text-stone-400 text-sm mt-2">
            Muestra real de nuestras instalaciones de pérgolas, cubiertas de panel sandwich y estructuras para paneles solares.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoriaActiva(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all duration-200 ${
                categoriaActiva === cat
                  ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30'
                  : 'bg-[#100e0d] text-stone-400 border border-stone-800 hover:border-orange-500/50 hover:text-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Siatka prac */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trabajosFiltrados.map((t, index) => (
            <div 
              key={index} 
              className="bg-[#100e0d] border border-stone-800 rounded-xl overflow-hidden shadow-lg hover:border-orange-500/50 transition-all duration-300 group"
            >
              <div className="h-52 overflow-hidden relative">
                <img 
                  src={t.img} 
                  alt={t.titulo} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-orange-600 text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded shadow">
                  {t.categoria}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-stone-200 text-base group-hover:text-orange-400 transition-colors">
                  {t.titulo}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}