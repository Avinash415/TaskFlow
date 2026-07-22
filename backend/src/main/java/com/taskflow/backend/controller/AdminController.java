package com.taskflow.backend.controller;

import com.taskflow.backend.dto.request.RoleUpdateRequestDTO;
import com.taskflow.backend.dto.request.StatusUpdateRequestDTO;
import com.taskflow.backend.dto.response.AdminDashboardResponseDTO;
import com.taskflow.backend.dto.response.UserResponseDTO;
import com.taskflow.backend.response.ApiResponse;
import com.taskflow.backend.service.AdminService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final AdminService adminService;

    // ==========================
    // Dashboard
    // ==========================

    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse<AdminDashboardResponseDTO>> getDashboard() {

        return ResponseEntity.ok(
                ApiResponse.<AdminDashboardResponseDTO>builder()
                        .success(true)
                        .message("Admin dashboard fetched successfully")
                        .data(adminService.getDashboard())
                        .build()
        );
    }

    // ==========================
    // User Management
    // ==========================

    @GetMapping("/users")
    public ResponseEntity<ApiResponse<List<UserResponseDTO>>> getAllUsers() {

        return ResponseEntity.ok(
                ApiResponse.<List<UserResponseDTO>>builder()
                        .success(true)
                        .message("Users fetched successfully")
                        .data(adminService.getAllUsers())
                        .build()
        );
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<ApiResponse<UserResponseDTO>> getUserById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                ApiResponse.<UserResponseDTO>builder()
                        .success(true)
                        .message("User fetched successfully")
                        .data(adminService.getUserById(id))
                        .build()
        );
    }

    @PutMapping("/users/{id}/role")
    public ResponseEntity<ApiResponse<UserResponseDTO>> updateUserRole(
            @PathVariable Long id,
            @Valid @RequestBody RoleUpdateRequestDTO request) {

        return ResponseEntity.ok(
                ApiResponse.<UserResponseDTO>builder()
                        .success(true)
                        .message("User role updated successfully")
                        .data(adminService.updateUserRole(id, request))
                        .build()
        );
    }

    @PutMapping("/users/{id}/status")
    public ResponseEntity<ApiResponse<UserResponseDTO>> updateUserStatus(
            @PathVariable Long id,
            @Valid @RequestBody StatusUpdateRequestDTO request) {

        return ResponseEntity.ok(
                ApiResponse.<UserResponseDTO>builder()
                        .success(true)
                        .message("User status updated successfully")
                        .data(adminService.updateUserStatus(id, request))
                        .build()
        );
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteUser(
            @PathVariable Long id) {

        adminService.deleteUser(id);

        return ResponseEntity.ok(
                ApiResponse.<Void>builder()
                        .success(true)
                        .message("User deleted successfully")
                        .build()
        );
    }
}