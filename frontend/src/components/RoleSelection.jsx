import React from 'react';

export const RoleSelection = ({ actions, setPin, setName }) => {
  return (
    <div className="min-h-screen bg-purple-900 flex flex-col items-center justify-center text-white p-4 font-sans">
      <h1 className="text-6xl font-black mb-12 tracking-tighter">KAHOOT! CLONE</h1>
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Tarjeta Profe */}
        <div className="bg-white text-purple-900 p-8 rounded-2xl shadow-2xl w-80 text-center hover:scale-105 transition">
          <h2 className="text-2xl font-bold mb-4">Soy el Profe</h2>
          <button onClick={actions.createGame} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition">
            Crear Partida
          </button>
        </div>
        
        {/* Tarjeta Alumno */}
        <div className="bg-white text-purple-900 p-8 rounded-2xl shadow-2xl w-80 text-center hover:scale-105 transition">
          <h2 className="text-2xl font-bold mb-4">Soy Alumno</h2>
          <input 
            placeholder="PIN de Juego" 
            className="w-full mb-3 p-3 border-2 border-gray-200 rounded-lg text-center font-bold"
            onChange={e => setPin(e.target.value)}
          />
          <input 
            placeholder="Tu Nombre" 
            className="w-full mb-6 p-3 border-2 border-gray-200 rounded-lg text-center font-bold"
            onChange={e => setName(e.target.value)}
          />
          <button onClick={actions.joinGame} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition">
            Entrar
          </button>
        </div>

      </div>
    </div>
  );
};