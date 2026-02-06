import { useState, useRef } from 'react';
// En tu proyecto local, asegúrate de tener instalado: npm install @stomp/stompjs
import { Client } from '@stomp/stompjs';

export const useGameLogic = (apiUrl, socketUrl) => {
  const [role, setRole] = useState(null);
  const [pin, setPin] = useState('');
  const [name, setName] = useState('');
  const [gameStatus, setGameStatus] = useState('LOBBY');
  const [players, setPlayers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  
  const stompClientRef = useRef(null);

  // --- Conexión WebSocket ---
  const connectToGame = (gamePin, playerName) => {
    const client = new Client({
      brokerURL: socketUrl,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log('🔗 Conectado al WebSocket en:', socketUrl);

        client.subscribe(`/topic/game/${gamePin}`, (message) => {
          const body = JSON.parse(message.body);
          handleGameEvent(body);
        });

        if (playerName) {
          client.publish({
            destination: '/app/join',
            body: JSON.stringify({ pin: gamePin, name: playerName })
          });
        }
      },
      onStompError: (frame) => {
        console.error('Error de Broker:', frame.headers['message']);
      }
    });
    client.activate();
    stompClientRef.current = client;
  };

  const handleGameEvent = (event) => {
    if (event.players) setPlayers(event.players);
    if (event.type === 'QUESTION_ACTIVE') {
      setGameStatus('QUESTION');
      setCurrentQuestion(event.data);
    }
  };

  const actions = {
    setRole,
    setPin,
    setName,
    
    createGame: async () => {
      try {
        // Hacemos la petición a la API. 
        // Si tu backend da error 405, asegúrate de que el Controller Java tenga @GetMapping
        const response = await fetch(`${apiUrl}/create?hostId=Profe`);
        if (!response.ok) throw new Error('Error en API: ' + response.statusText);
        const newPin = await response.text();
        
        setPin(newPin);
        setRole('HOST');
        connectToGame(newPin, null);
      } catch (e) {
        alert('Error conectando al backend (Puerto 8080). Revisa la consola.');
        console.error(e);
      }
    },

    joinGame: () => {
      if (!pin || !name) return alert('Datos incompletos');
      setRole('PLAYER');
      connectToGame(pin, name);
    },

    nextQuestion: () => {
      stompClientRef.current?.publish({
        destination: '/app/next',
        body: JSON.stringify({ pin })
      });
    },

    submitAnswer: (index) => {
      stompClientRef.current?.publish({
        destination: '/app/answer',
        body: JSON.stringify({ pin, playerName: name, answerIndex: index })
      });
      setGameStatus('WAITING_RESULT');
    }
  };

  return {
    state: { role, pin, name, gameStatus, players, currentQuestion },
    actions
  };
};