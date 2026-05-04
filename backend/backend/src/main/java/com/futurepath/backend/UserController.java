package com.futurepath.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserRepository repo;

    // 🔐 Normal login
    @PostMapping("/login")
    public String login(@RequestBody User user) {
        Optional<User> dbUser = repo.findByEmail(user.getEmail());

        if (dbUser.isEmpty()) return "User not found";

        if (!dbUser.get().getPassword().equals(user.getPassword()))
            return "Invalid password";

        return "Login success";
    }

    // 🔵 Google login
    @PostMapping("/google-login")
    public String googleLogin(@RequestBody User user) {
        Optional<User> existing = repo.findByEmail(user.getEmail());

        if (existing.isEmpty()) {
            repo.save(user);
        }

        return "Google login success";
    }
}