package com.taskflow.backend.service.impl;

import com.taskflow.backend.dto.request.TaskRequestDTO;
import com.taskflow.backend.dto.response.TaskResponseDTO;
import com.taskflow.backend.entity.Project;
import com.taskflow.backend.entity.Task;
import com.taskflow.backend.entity.User;
import com.taskflow.backend.exception.ResourceNotFoundException;
import com.taskflow.backend.mapper.TaskMapper;
import com.taskflow.backend.repository.ProjectRepository;
import com.taskflow.backend.repository.TaskRepository;
import com.taskflow.backend.repository.UserRepository;
import com.taskflow.backend.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final TaskMapper taskMapper;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;

    @Override
    public TaskResponseDTO createTask(TaskRequestDTO request, Authentication authentication) {
        User user = getCurrentUser(authentication);

        Task task = taskMapper.toEntity(request);
        task.setUser(user);

        if (request.getProjectId() != null) {
            Project project = projectRepository.findById(request.getProjectId())
                    .filter(p -> p.getUser().getId().equals(user.getId()))
                    .orElseThrow(() -> new ResourceNotFoundException("Project not found or access denied"));
            task.setProject(project);
        }

        Task saved = taskRepository.save(task);
        return taskMapper.toResponse(saved);
    }

    @Override
    public List<TaskResponseDTO> getMyTasks(Authentication authentication) {
        User user = getCurrentUser(authentication);
        return taskRepository.findByUserId(user.getId())
                .stream()
                .map(taskMapper::toResponse)
                .toList();
    }

    @Override
    public List<TaskResponseDTO> getTasksByProject(Long projectId, Authentication authentication) {
        User user = getCurrentUser(authentication);
        return taskRepository.findByUserIdAndProjectId(user.getId(), projectId)
                .stream()
                .map(taskMapper::toResponse)
                .toList();
    }

    @Override
    public TaskResponseDTO getTaskById(Long id, Authentication authentication) {
        Task task = findTaskByIdAndUser(id, authentication);
        return taskMapper.toResponse(task);
    }

    @Override
    public TaskResponseDTO updateTask(Long id, TaskRequestDTO request, Authentication authentication) {
        Task task = findTaskByIdAndUser(id, authentication);
        taskMapper.updateEntity(request, task);
        Task updated = taskRepository.save(task);
        return taskMapper.toResponse(updated);
    }

    @Override
    public void deleteTask(Long id, Authentication authentication) {
        Task task = findTaskByIdAndUser(id, authentication);
        taskRepository.delete(task);
    }

    @Override
    public TaskResponseDTO updateTaskStatus(Long id, String status, Authentication authentication) {
        Task task = findTaskByIdAndUser(id, authentication);
        task.setStatus(com.taskflow.backend.enums.TaskStatus.valueOf(status.toUpperCase()));
        Task updated = taskRepository.save(task);
        return taskMapper.toResponse(updated);
    }

    private User getCurrentUser(Authentication authentication) {
        return userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    private Task findTaskByIdAndUser(Long id, Authentication authentication) {
        User user = getCurrentUser(authentication);
        return taskRepository.findById(id)
                .filter(t -> t.getUser().getId().equals(user.getId()))
                .orElseThrow(() -> new ResourceNotFoundException("Task not found or access denied"));
    }
}