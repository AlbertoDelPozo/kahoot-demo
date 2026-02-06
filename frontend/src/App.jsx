import React from 'react';
// Importamos la lógica del juego (estado y conexión)
import { useGameLogic } from './hooks/useGameLogic';

// Importamos los componentes visuales
import { RoleSelection } from './components/RoleSelection';
import { HostView } from './components/HostView';
import { PlayerView } from './components/PlayerView';

// --- CONFIGURACIÓN DE ENTORNOS (PRODUCCIÓN VS LOCAL) ---
// Este código se ejecuta una vez al cargar la página

// 1. Detectar URL Base
// 'import.meta.env.VITE_API_URL' es la variable que configuraremos en Vercel.
// Si no existe (porque estás en tu PC), usamos 'http://localhost:8080' por defecto.
const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// 2. Preparar URL de la API REST
// Ejemplo: "http://localhost:8080/api" o "https://mi-backend.railway.app/api"
const API_URL = `${BACKEND_URL}/api`;

// 3. Preparar URL de WebSockets
// Reemplazamos "http" por "ws" (o "https" por "wss") para conectar el socket
// Ejemplo: "ws://localhost:8080/ws"
const SOCKET_URL = BACKEND_URL.replace(/^http/, 'ws') + '/ws';

export default function App() {
  // 4. Instanciamos el Hook pasándole las URLs calculadas
  // Esto conecta la lógica con el backend correcto (local o nube)
  const { state, actions } = useGameLogic(API_URL, SOCKET_URL);

  // 5. Renderizado Condicional:
  // Decidimos qué pintar en pantalla basándonos únicamente en el estado del rol.

  // CASO A: Usuario no ha elegido rol todavía -> Pantalla de Inicio
  if (!state.role) {
    return (
      <RoleSelection 
        actions={actions} 
        setPin={actions.setPin} 
        setName={actions.setName} 
      />
    );
  }

  // CASO B: El usuario es el ANFITRION (Profe) -> Vista de Host
  if (state.role === 'HOST') {
    return <HostView state={state} actions={actions} />;
  }

  // CASO C: El usuario es un JUGADOR (Alumno) -> Vista de Player
  if (state.role === 'PLAYER') {
    return <PlayerView state={state} actions={actions} />;
  }

  return null;
}