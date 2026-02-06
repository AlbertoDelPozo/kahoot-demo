import React from 'react';

export const HostView = ({ state, actions }) => {
  const { pin, players, gameStatus, currentQuestion } = state;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8 font-sans">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-2xl p-8 min-h-[600px] flex flex-col">
        
        {/* Header */}
        <header className="flex justify-between items-center border-b pb-6 mb-8">
          <div>
            <span className="text-gray-500 text-sm font-bold uppercase">PIN de Sala</span>
            <h2 className="text-5xl font-black text-purple-900">{pin}</h2>
          </div>
          <div className="bg-purple-100 text-purple-800 px-6 py-2 rounded-full font-bold text-lg">
            👥 {players.length} Jugadores
          </div>
        </header>

        {/* Contenido Principal */}
        <main className="flex-1 flex flex-col items-center justify-center w-full">
          
          {gameStatus === 'LOBBY' && (
            <div className="text-center w-full">
              <h3 className="text-2xl mb-8 text-gray-500">Esperando jugadores...</h3>
              <div className="flex flex-wrap gap-4 justify-center mb-12">
                {players.map(p => (
                  <span key={p} className="bg-purple-600 text-white px-6 py-3 rounded-lg font-bold text-xl animate-bounce">
                    {p}
                  </span>
                ))}
              </div>
              <button onClick={actions.nextQuestion} className="bg-black text-white text-xl px-12 py-4 rounded-full font-bold hover:scale-105 transition">
                Comenzar Juego
              </button>
            </div>
          )}

          {gameStatus === 'QUESTION' && currentQuestion && (
            <div className="w-full text-center animate-fade-in">
              <h1 className="text-4xl font-bold mb-12 text-gray-800">{currentQuestion.text}</h1>
              <div className="grid grid-cols-2 gap-6 h-80">
                {currentQuestion.options.map((opt, i) => (
                  <div key={i} className={`flex items-center justify-center text-3xl font-bold text-white rounded-xl shadow-lg
                    ${i === 0 ? 'bg-red-500' : ''}
                    ${i === 1 ? 'bg-blue-500' : ''}
                    ${i === 2 ? 'bg-yellow-500' : ''}
                    ${i === 3 ? 'bg-green-500' : ''}
                  `}>
                    {opt}
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};