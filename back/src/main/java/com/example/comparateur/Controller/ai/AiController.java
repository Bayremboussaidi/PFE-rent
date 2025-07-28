package com.example.comparateur.Controller.ai;

import java.util.List;
import java.util.Map;

import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;

import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/chat")
public class AiController {

    @Value("${github.api.token}")
    private String githubToken;

    @Value("${github.api.endpoint}")
    private String githubEndpoint;

    @Value("${github.api.model}")
    private String githubModel;

    private final WebClient webClient;

    public AiController(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
    }




@PostMapping("/ask")
public ResponseEntity<Map<String, String>> ask(@RequestBody Map<String, String> request) {
    String prompt = request.get("prompt");

    if (prompt == null || prompt.isBlank()) {
        return ResponseEntity.badRequest()
            .body(Map.of("error", "Prompt cannot be empty"));
    }

    Map<String, Object> body = Map.of(
        "model", githubModel,
        "prompt", prompt,
        "temperature", 0.7,
        "max_tokens", 500
    );

    try {
        Map<String, Object> response = webClient.post()
            .uri(githubEndpoint)
            .header("Authorization", "Bearer " + githubToken)
            .header("X-GitHub-Api-Version", "2022-11-28")
            .header("Content-Type", "application/json")
            .header("Accept", "application/vnd.github+json")
            .bodyValue(body)
            .retrieve()
            .onStatus(
                status -> status.is4xxClientError(),
                clientResponse -> clientResponse.bodyToMono(String.class)
                    .flatMap(errorBody -> Mono.error(new RuntimeException("Client error: " + errorBody)))
            )
            .onStatus(
                status -> status.is5xxServerError(),
                serverResponse -> serverResponse.bodyToMono(String.class)
                    .flatMap(errorBody -> Mono.error(new RuntimeException("Server error: " + errorBody)))
            )
            .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {})
            .block();

        // Response handling remains the same
        if (response != null && response.containsKey("choices")) {
            List<?> choices = (List<?>) response.get("choices");
            if (!choices.isEmpty()) {
                Map<?, ?> firstChoice = (Map<?, ?>) choices.get(0);
                String text = (String) firstChoice.get("text");
                return ResponseEntity.ok(Map.of("response", text.trim()));
            }
        }
        
        return ResponseEntity.internalServerError()
            .body(Map.of("error", "Empty response from Copilot"));

    } catch (Exception e) {
        return ResponseEntity.internalServerError()
            .body(Map.of("error", "Copilot Error: " + e.getMessage()));
    }
}


}
