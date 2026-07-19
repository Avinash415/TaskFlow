package com.taskflow.backend.controller;

import com.taskflow.backend.dto.request.LoginRequestDTO;
import com.taskflow.backend.dto.request.RegisterRequestDTO;
import com.taskflow.backend.dto.response.AuthenticationResponseDTO;
import com.taskflow.backend.response.ApiResponse;
import com.taskflow.backend.service.AuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthenticationResponseDTO>> register(
            @Valid @RequestBody RegisterRequestDTO request) {

        AuthenticationResponseDTO response =
                authenticationService.register(request);

        return ResponseEntity.ok(
                ApiResponse.<AuthenticationResponseDTO>builder()
                        .success(true)
                        .message("Registration successful")
                        .data(response)
                        .build()
        );
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthenticationResponseDTO>> login(
            @Valid @RequestBody LoginRequestDTO request) {

        AuthenticationResponseDTO response =
                authenticationService.login(request);

        return ResponseEntity.ok(
                ApiResponse.<AuthenticationResponseDTO>builder()
                        .success(true)
                        .message("Login successful")
                        .data(response)
                        .build()
        );
    }
}