export default function Services() {
  const servicios = [
    {
      titulo: 'Estructuras y Porches',
      desc: 'Montaje de estructuras metálicas, techos y techados para vehículos o terrazas.'
    },
    {
      titulo: 'Pérgolas y Cenadores',
      desc: 'Diseño e instalación de pérgolas de hierro duraderas para jardín o patio.'
    },
    {
      titulo: 'Puertas y Rejas',
      desc: 'Puertas de garaje, rejas de protección para ventanas, barandillas y cerramientos.'
    }
  ];

  return (
    <section id="servicios" className="py-12 bg-slate-100 text-slate-800">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Nuestros Servicios</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {servicios.map((s, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold mb-2 text-slate-900">{s.titulo}</h3>
              <p className="text-slate-600 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}