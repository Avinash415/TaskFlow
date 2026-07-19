package com.taskflow.backend.controller;

import com.taskflow.backend.dto.request.TaskRequestDTO;
import com.taskflow.backend.dto.response.TaskResponseDTO;
import com.taskflow.backend.response.ApiResponse;
import com.taskflow.backend.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    public ResponseEntity<ApiResponse<TaskResponseDTO>> createTask(
            @Valid @RequestBody TaskRequestDTO request,
            Authentication authentication) {

        TaskResponseDTO task = taskService.createTask(request, authentication);

        return ResponseEntity.ok(ApiResponse.<TaskResponseDTO>builder()
                .success(true)
                .message("Task created successfully")
                .data(task)
                .build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<TaskResponseDTO>>> getMyTasks(Authentication authentication) {
        List<TaskResponseDTO> tasks = taskService.getMyTasks(authentication);

        return ResponseEntity.ok(ApiResponse.<List<TaskResponseDTO>>builder()
                .success(true)
                .message("Tasks retrieved successfully")
                .data(tasks)
                .build());
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<ApiResponse<List<TaskResponseDTO>>> getTasksByProject(
            @PathVariable Long projectId, Authentication authentication) {

        List<TaskResponseDTO> tasks = taskService.getTasksByProject(projectId, authentication);

        return ResponseEntity.ok(ApiResponse.<List<TaskResponseDTO>>builder()
                .success(true)
                .message("Project tasks retrieved successfully")
                .data(tasks)
                .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<TaskResponseDTO>> getTaskById(
            @PathVariable Long id, Authentication authentication) {

        TaskResponseDTO task = taskService.getTaskById(id, authentication);

        return ResponseEntity.ok(ApiResponse.<TaskResponseDTO>builder()
                .success(true)
                .message("Task retrieved successfully")
                .data(task)
                .build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<TaskResponseDTO>> updateTask(
            @PathVariable Long id,
            @Valid @RequestBody TaskRequestDTO request,
            Authentication authentication) {

        TaskResponseDTO task = taskService.updateTask(id, request, authentication);

        return ResponseEntity.ok(ApiResponse.<TaskResponseDTO>builder()
                .success(true)
                .message("Task updated successfully")
                .data(task)
                .build());
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<TaskResponseDTO>> updateStatus(
            @PathVariable Long id,
            @RequestParam String status,
            Authentication authentication) {

        TaskResponseDTO task = taskService.updateTaskStatus(id, status, authentication);

        return ResponseEntity.ok(ApiResponse.<TaskResponseDTO>builder()
                .success(true)
                .message("Task status updated successfully")
                .data(task)
                .build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteTask(
            @PathVariable Long id, Authentication authentication) {

        taskService.deleteTask(id, authentication);

        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .success(true)
                .message("Task deleted successfully")
                .build());
    }
}