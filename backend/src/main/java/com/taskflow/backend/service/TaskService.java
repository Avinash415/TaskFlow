package com.taskflow.backend.service;

import com.taskflow.backend.dto.request.TaskRequestDTO;
import com.taskflow.backend.dto.response.TaskResponseDTO;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface TaskService {

    TaskResponseDTO createTask(TaskRequestDTO request, Authentication authentication);

    List<TaskResponseDTO> getMyTasks(Authentication authentication);

    List<TaskResponseDTO> getTasksByProject(Long projectId, Authentication authentication);

    TaskResponseDTO getTaskById(Long id, Authentication authentication);

    TaskResponseDTO updateTask(Long id, TaskRequestDTO request, Authentication authentication);

    void deleteTask(Long id, Authentication authentication);

    TaskResponseDTO updateTaskStatus(Long id, String status, Authentication authentication);
}