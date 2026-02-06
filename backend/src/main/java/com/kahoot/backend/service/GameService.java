package com.kahoot.backend.service;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.TimeUnit;

@Service
public class GameService {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;
    
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    // Clase interna simple para probar
    @Data @AllArgsConstructor @NoArgsConstructor
    public static class GameState implements Serializable {
        private String pin;
        private String stage; 
        private List<String> players = new ArrayList<>();
    }

    public String createGame(String hostId) {
        String pin = String.valueOf(new Random().nextInt(9000) + 1000);
        GameState initial = new GameState(pin, "WAITING", new ArrayList<>());
        
        // Guardar en Redis
        redisTemplate.opsForValue().set("game:" + pin, initial, 1, TimeUnit.HOURS);
        System.out.println("Juego creado: " + pin);
        return pin;
    }

    public void playerJoin(String pin, String playerName) {
        String key = "game:" + pin;
        GameState game = (GameState) redisTemplate.opsForValue().get(key);
        
        if (game != null) {
            game.getPlayers().add(playerName);
            redisTemplate.opsForValue().set(key, game);
            
            // Avisar a todos en la sala
            messagingTemplate.convertAndSend("/topic/game/" + pin, game);
            System.out.println("Jugador " + playerName + " unido a sala " + pin);
        }
    }
}