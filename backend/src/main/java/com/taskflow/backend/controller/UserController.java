package com.taskflow.backend.controller;

import com.taskflow.backend.dto.request.UserRequestDTO;
import com.taskflow.backend.dto.response.UserResponseDTO;
import com.taskflow.backend.response.ApiResponse;
import com.taskflow.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<ApiResponse<UserResponseDTO>>
    createUser(@Valid @RequestBody UserRequestDTO request) {

        UserResponseDTO response =
                userService.createUser(request);

        ApiResponse<UserResponseDTO> apiResponse =
                ApiResponse.<UserResponseDTO>builder()
                        .success(true)
                        .message("User created successfully")
                        .data(response)
                        .build();

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(apiResponse);
    }

}