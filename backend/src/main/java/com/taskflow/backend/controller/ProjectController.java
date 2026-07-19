package com.taskflow.backend.controller;

import com.taskflow.backend.dto.request.ProjectRequestDTO;
import com.taskflow.backend.dto.response.ProjectResponseDTO;
import com.taskflow.backend.response.ApiResponse;
import com.taskflow.backend.service.ProjectService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    @PostMapping
    public ResponseEntity<ApiResponse<ProjectResponseDTO>> createProject(
            @Valid @RequestBody ProjectRequestDTO request,
            Authentication authentication) {

        ProjectResponseDTO response = projectService.createProject(request, authentication);

        return ResponseEntity.ok(
                ApiResponse.<ProjectResponseDTO>builder()
                        .success(true)
                        .message("Project created successfully")
                        .data(response)
                        .build()
        );
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ProjectResponseDTO>>> getMyProjects(Authentication authentication) {
        List<ProjectResponseDTO> projects = projectService.getMyProjects(authentication);

        return ResponseEntity.ok(
                ApiResponse.<List<ProjectResponseDTO>>builder()
                        .success(true)
                        .message("Projects retrieved successfully")
                        .data(projects)
                        .build()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProjectResponseDTO>> getProjectById(
            @PathVariable Long id, Authentication authentication) {

        ProjectResponseDTO project = projectService.getProjectById(id, authentication);

        return ResponseEntity.ok(
                ApiResponse.<ProjectResponseDTO>builder()
                        .success(true)
                        .message("Project retrieved successfully")
                        .data(project)
                        .build()
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ProjectResponseDTO>> updateProject(
            @PathVariable Long id,
            @Valid @RequestBody ProjectRequestDTO request,
            Authentication authentication) {

        ProjectResponseDTO project = projectService.updateProject(id, request, authentication);

        return ResponseEntity.ok(
                ApiResponse.<ProjectResponseDTO>builder()
                        .success(true)
                        .message("Project updated successfully")
                        .data(project)
                        .build()
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteProject(
            @PathVariable Long id, Authentication authentication) {

        projectService.deleteProject(id, authentication);

        return ResponseEntity.ok(
                ApiResponse.<Void>builder()
                        .success(true)
                        .message("Project deleted successfully")
                        .build()
        );
    }
}