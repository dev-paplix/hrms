package com.example.hrms.common;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class LoginBKD {

    @Autowired
    private UserService userService;

    @Autowired
    private JWTUtility jwtUtility;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Endpoint for login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Optional<Users> user = userService.authenticateUser(loginRequest.getEmail(), loginRequest.getPassword());

        if (user.isPresent()) {
            // Verify password using password encoder (if passwords are hashed)
            boolean passwordMatch = passwordEncoder.matches(loginRequest.getPassword(), user.get().getPassword());

            if (passwordMatch) {
                // Generate JWT token
                String token = jwtUtility.generateToken(user.get().getEmail());

                // Return token and user details
                return ResponseEntity.ok(new LoginResponse(token, user.get().getUsername()));
            }
        }
        return ResponseEntity.status(401).body("Invalid credentials");
    }

    // Register endpoint (Optional)
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Users newUser) {
        // Encrypt password before saving
        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
        Users savedUser = userService.createUser(newUser);
        return ResponseEntity.ok(savedUser);
    }

    // Utility class for login request
    public static class LoginRequest {
        private String email;
        private String password;

        // Getters and setters
        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }

    // Utility class for login response
    public static class LoginResponse {
        private String token;
        private String username;

        public LoginResponse(String token, String username) {
            this.token = token;
            this.username = username;
        }

        public String getToken() {
            return token;
        }

        public void setToken(String token) {
            this.token = token;
        }

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }
    }
}

