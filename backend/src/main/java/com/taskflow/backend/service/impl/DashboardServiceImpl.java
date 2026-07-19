package com.taskflow.backend.service.impl;

import com.taskflow.backend.dto.response.DashboardResponseDTO;
import com.taskflow.backend.dto.response.TaskResponseDTO;
import com.taskflow.backend.entity.User;
import com.taskflow.backend.enums.TaskPriority;
import com.taskflow.backend.enums.TaskStatus;
import com.taskflow.backend.mapper.TaskMapper;
import com.taskflow.backend.repository.CategoryRepository;
import com.taskflow.backend.repository.ProjectRepository;
import com.taskflow.backend.repository.TaskRepository;
import com.taskflow.backend.repository.UserRepository;
import com.taskflow.backend.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final UserRepository userRepository;

    private final ProjectRepository projectRepository;

    private final TaskRepository taskRepository;

    private final CategoryRepository categoryRepository;

    private final TaskMapper taskMapper;

    @Override
    public DashboardResponseDTO getDashboard(Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        List<TaskResponseDTO> recentTasks =
                taskRepository.findTop5ByUserOrderByCreatedAtDesc(user)
                        .stream()
                        .map(taskMapper::toResponse)
                        .toList();

        return DashboardResponseDTO.builder()

                .totalProjects(
                        projectRepository.countByUser(user)
                )

                .totalTasks(
                        taskRepository.countByUser(user)
                )

                .completedTasks(
                        taskRepository.countByUserAndStatus(
                                user,
                                TaskStatus.COMPLETED
                        )
                )

                .pendingTasks(
                        taskRepository.countByUserAndStatus(
                                user,
                                TaskStatus.PENDING
                        )
                )

                .inProgressTasks(
                        taskRepository.countByUserAndStatus(
                                user,
                                TaskStatus.IN_PROGRESS
                        )
                )

                .highPriorityTasks(
                        taskRepository.countByUserAndPriority(
                                user,
                                TaskPriority.HIGH
                        )
                )

                .mediumPriorityTasks(
                        taskRepository.countByUserAndPriority(
                                user,
                                TaskPriority.MEDIUM
                        )
                )

                .lowPriorityTasks(
                        taskRepository.countByUserAndPriority(
                                user,
                                TaskPriority.LOW
                        )
                )

                .totalCategories(
                        categoryRepository.count()
                )

                .recentTasks(recentTasks)

                .build();

    }

}