package com.futurepath.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClient;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.futurepath.backend.model.Roadmap;
import com.futurepath.backend.repository.RoadmapRepository;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class AIController {

    @Value("${gemini.api.key}")
    private String API_KEY;

    @Autowired
    private RoadmapRepository repository;

    private final RestClient restClient = RestClient.builder().build();

    @PostMapping("/roadmap")
    public ResponseEntity<String> getRoadmap(@RequestBody Map<String, String> data) {

        // ✅ FIXED WORKING MODEL
String url = "Enter you Model"+ API_KEY;
        String prompt = String.format(
            "Create a highly detailed, actionable career roadmap for %s to become a %s in %s years. " +
            "Return EXACTLY a valid JSON object. Do not enclose the JSON inside markdown code blocks. " +
            "Required Exact Structure: { \"name\": \"string\", \"role\": \"string\", \"years\": [ " +
            "{ \"year\": 1, \"phases\": [ { \"months\": \"1-6\", \"title\": \"string\", \"topics\": [], \"projects\": [] } ] } ] }",
            data.get("name"), data.get("ambition"), data.get("years")
        );

        Map<String, Object> requestBody = Map.of(
            "contents", List.of(Map.of("parts", List.of(Map.of("text", prompt))))
        );

        try {
            String response = restClient.post()
                    .uri(url)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(requestBody)
                    .retrieve()
                    .body(String.class);

            // ✅ Extract clean JSON
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response);

            String text = root
                    .path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText();

            // ✅ SAVE TO DATABASE
            Roadmap r = new Roadmap();
            r.setName(data.get("name"));
            r.setRole(data.get("ambition"));
            r.setRoadmapJson(text);

            repository.save(r);

            return ResponseEntity.ok(text);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500)
                    .body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }
}