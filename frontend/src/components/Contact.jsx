export default function Contact() {
  return (
    <section id="contacto" className="py-12 bg-slate-900 text-white">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Pedir Presupuesto</h2>
        <p className="text-center text-slate-400 text-sm mb-6">
          Déjenos sus datos y le responderemos lo antes posible.
        </p>

        <form className="bg-slate-800 p-6 rounded-lg space-y-4">
          <div>
            <label className="block text-sm mb-1 text-slate-300">Nombre</label>
            <input
              type="text"
              placeholder="Su nombre"
              className="w-full p-2.5 rounded bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-sky-400"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-slate-300">Teléfono o Email</label>
            <input
              type="text"
              placeholder="Teléfono de contacto"
              className="w-full p-2.5 rounded bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-sky-400"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-slate-300">Mensaje</label>
            <textarea
              rows="4"
              placeholder="¿Qué trabajo necesita realizar?"
              className="w-full p-2.5 rounded bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-sky-400 resize-none"
            ></textarea>
          </div>

          <button
            type="button"
            className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 rounded text-sm transition"
          >
            Enviar Mensaje
          </button>
        </form>
      </div>
    </section>
  );
}