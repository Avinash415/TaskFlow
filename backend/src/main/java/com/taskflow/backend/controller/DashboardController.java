package com.taskflow.backend.controller;

import com.taskflow.backend.dto.response.DashboardResponseDTO;
import com.taskflow.backend.response.ApiResponse;
import com.taskflow.backend.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping
    public ResponseEntity<ApiResponse<DashboardResponseDTO>> getDashboard(
            Authentication authentication) {

        DashboardResponseDTO dashboard =
                dashboardService.getDashboard(authentication);

        return ResponseEntity.ok(
                ApiResponse.<DashboardResponseDTO>builder()
                        .success(true)
                        .message("Dashboard data fetched successfully")
                        .data(dashboard)
                        .build()
        );

    }

}