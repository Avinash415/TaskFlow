package com.taskflow.backend.controller;

import com.taskflow.backend.dto.request.UserRequestDTO;
import com.taskflow.backend.dto.response.UserResponseDTO;
import com.taskflow.backend.response.ApiResponse;
import com.taskflow.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

        private final UserService userService;

        @PostMapping
        public ResponseEntity<ApiResponse<UserResponseDTO>> createUser(
                        @Valid @RequestBody UserRequestDTO request) {

                UserResponseDTO response = userService.createUser(request);

                ApiResponse<UserResponseDTO> apiResponse = ApiResponse.<UserResponseDTO>builder()
                                .success(true)
                                .message("User created successfully")
                                .data(response)
                                .build();

                return ResponseEntity
                                .status(HttpStatus.CREATED)
                                .body(apiResponse);
        }

        @GetMapping
        public ResponseEntity<ApiResponse<List<UserResponseDTO>>> getAllUsers() {

                List<UserResponseDTO> users = userService.getAllUsers();

                ApiResponse<List<UserResponseDTO>> response = ApiResponse.<List<UserResponseDTO>>builder()
                                .success(true)
                                .message("Users fetched successfully")
                                .data(users)
                                .build();

                return ResponseEntity.ok(response);
        }

        @GetMapping("/{id}")
        public ResponseEntity<ApiResponse<UserResponseDTO>> getUserById(
                        @PathVariable Long id) {

                UserResponseDTO user = userService.getUserById(id);

                ApiResponse<UserResponseDTO> response = ApiResponse.<UserResponseDTO>builder()
                                .success(true)
                                .message("User fetched successfully")
                                .data(user)
                                .build();

                return ResponseEntity.ok(response);
        }

        @PutMapping("/{id}")
        public ResponseEntity<ApiResponse<UserResponseDTO>> updateUser(
                        @PathVariable Long id,
                        @Valid @RequestBody UserRequestDTO request) {

                UserResponseDTO updated = userService.updateUser(id, request);

                ApiResponse<UserResponseDTO> response = ApiResponse.<UserResponseDTO>builder()
                                .success(true)
                                .message("User updated successfully")
                                .data(updated)
                                .build();

                return ResponseEntity.ok(response);
        }

        @DeleteMapping("/{id}")
        public ResponseEntity<ApiResponse<Void>> deleteUser(@PathVariable Long id) {

                userService.deleteUser(id);

                ApiResponse<Void> response = ApiResponse.<Void>builder()
                                .success(true)
                                .message("User deleted successfully")
                                .build();

                return ResponseEntity.ok(response);
        }
}