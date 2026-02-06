package com.kahoot.backend.controller;

import com.kahoot.backend.service.GameService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class GameSocketController {

    @Autowired
    private GameService gameService;

    // HTTP: Crear partida
    // Usamos @GetMapping para facilitar pruebas desde el navegador.
    @GetMapping("/api/create")
    @ResponseBody
    public String createGame(@RequestParam String hostId) {
        return gameService.createGame(hostId);
    }

    // --- WEBSOCKETS (Eventos del juego) ---

    // 1. Unirse a la sala
    // Cliente envía a: /app/join
    @MessageMapping("/join")
    public void joinGame(@Payload JoinRequest request) {
        System.out.println("Jugador intentando unirse: " + request.getName());
        gameService.playerJoin(request.getPin(), request.getName());
    }

    // 2. Enviar respuesta
    // Cliente envía a: /app/answer
    @MessageMapping("/answer")
    public void submitAnswer(@Payload AnswerRequest request) {
        System.out.println("Respuesta recibida de: " + request.getPlayerName());
        gameService.processAnswer(request.getPin(), request.getPlayerName(), request.getAnswerIndex());
    }

    // 3. Siguiente pregunta (Solo el Host debería llamar a esto)
    // Cliente envía a: /app/next
    @MessageMapping("/next")
    public void nextQuestion(@Payload GameRequest request) {
        System.out.println("Avanzando pregunta en sala: " + request.getPin());
        gameService.nextQuestion(request.getPin());
    }

    // --- DTOs (Estructuras de los mensajes JSON) ---
    
    @Data
    public static class JoinRequest {
        private String pin;
        private String name;
    }

    @Data
    public static class AnswerRequest {
        private String pin;
        private String playerName;
        private int answerIndex;
    }

    @Data
    public static class GameRequest {
        private String pin;
    }
}