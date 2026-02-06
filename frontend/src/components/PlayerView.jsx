import React from 'react';

export const PlayerView = ({ state, actions }) => {
  const { name, pin, gameStatus } = state;

  return (
    <div className="min-h-screen bg-gray-900 p-4 flex flex-col font-sans">
      <header className="flex justify-between text-white mb-6 bg-gray-800 p-4 rounded-lg">
        <span className="font-bold text-lg">{name}</span>
        <span className="bg-purple-600 px-3 py-1 rounded font-mono">PIN: {pin}</span>
      </header>

      {gameStatus === 'LOBBY' && (
        <div className="flex-1 flex flex-col items-center justify-center text-white text-center">
          <div className="text-7xl mb-6 animate-pulse">👀</div>
          <h2 className="text-3xl font-bold mb-2">¡Estás dentro!</h2>
          <p className="text-gray-400 text-lg">Mira la pantalla principal</p>
        </div>
      )}

      {gameStatus === 'WAITING_RESULT' && (
        <div className="flex-1 flex flex-col items-center justify-center text-white text-center">
           <div className="text-7xl mb-6 animate-spin">⏳</div>
           <h2 className="text-3xl font-bold">Respuesta enviada</h2>
        </div>
      )}

      {gameStatus === 'QUESTION' && (
        <div className="flex-1 grid grid-cols-2 gap-4 mb-4">
          {['▲', '◆', '●', '■'].map((symbol, i) => (
            <button 
              key={i}
              onClick={() => actions.submitAnswer(i)}
              className={`text-7xl text-white rounded-2xl shadow-lg active:scale-95 transition flex items-center justify-center
                ${i === 0 ? 'bg-red-500' : ''}
                ${i === 1 ? 'bg-blue-500' : ''}
                ${i === 2 ? 'bg-yellow-500' : ''}
                ${i === 3 ? 'bg-green-500' : ''}
              `}
            >
              {symbol}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};