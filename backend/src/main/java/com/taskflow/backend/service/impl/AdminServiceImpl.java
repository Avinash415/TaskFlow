package com.taskflow.backend.service.impl;

import com.taskflow.backend.dto.request.RoleUpdateRequestDTO;
import com.taskflow.backend.dto.request.StatusUpdateRequestDTO;
import com.taskflow.backend.dto.response.AdminDashboardResponseDTO;
import com.taskflow.backend.dto.response.UserResponseDTO;
import com.taskflow.backend.entity.User;
import com.taskflow.backend.enums.Role;
import com.taskflow.backend.enums.TaskStatus;
import com.taskflow.backend.exception.BadRequestException;
import com.taskflow.backend.exception.ResourceNotFoundException;
import com.taskflow.backend.mapper.UserMapper;
import com.taskflow.backend.repository.CategoryRepository;
import com.taskflow.backend.repository.ProjectRepository;
import com.taskflow.backend.repository.TaskRepository;
import com.taskflow.backend.repository.UserRepository;
import com.taskflow.backend.security.util.CurrentUserService;
import com.taskflow.backend.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final TaskRepository taskRepository;
    private final CategoryRepository categoryRepository;
    private final UserMapper userMapper;
    private final CurrentUserService currentUserService;

    @Override
    public AdminDashboardResponseDTO getDashboard() {

        return AdminDashboardResponseDTO.builder()

                // User Statistics
                .totalUsers(userRepository.count())
                .activeUsers(userRepository.countByEnabledTrue())
                .disabledUsers(userRepository.countByEnabledFalse())
                .adminUsers(userRepository.countByRole(Role.ADMIN))
                .normalUsers(userRepository.countByRole(Role.USER))

                // Project Statistics
                .totalProjects(projectRepository.count())

                // Task Statistics
                .totalTasks(taskRepository.count())
                .completedTasks(taskRepository.countByStatus(TaskStatus.COMPLETED))
                .pendingTasks(taskRepository.countByStatus(TaskStatus.TODO))
                .inProgressTasks(taskRepository.countByStatus(TaskStatus.IN_PROGRESS))

                // Category Statistics
                .totalCategories(categoryRepository.count())

                .build();
    }

    @Override
    public List<UserResponseDTO> getAllUsers() {

        return userRepository.findAll()
                .stream()
                .map(userMapper::toResponse)
                .toList();
    }

    @Override
    public UserResponseDTO getUserById(Long id) {

        User user = getUser(id);

        return userMapper.toResponse(user);
    }

    @Override
    public UserResponseDTO updateUserRole(Long id,
                                          RoleUpdateRequestDTO request) {

        User currentUser = currentUserService.getCurrentUser();

        User targetUser = getUser(id);

        // Admin cannot change his own role
        if (currentUser.getId().equals(targetUser.getId())) {
            throw new BadRequestException(
                    "You cannot change your own role.");
        }

        // Last admin cannot become USER
        if (targetUser.getRole() == Role.ADMIN
                && request.getRole() == Role.USER
                && userRepository.countByRole(Role.ADMIN) == 1) {

            throw new BadRequestException(
                    "At least one admin must exist.");
        }

        targetUser.setRole(request.getRole());

        User updatedUser = userRepository.save(targetUser);

        return userMapper.toResponse(updatedUser);
    }

    @Override
    public UserResponseDTO updateUserStatus(Long id,
                                            StatusUpdateRequestDTO request) {

        User currentUser = currentUserService.getCurrentUser();

        User targetUser = getUser(id);

        // Admin cannot disable himself
        if (currentUser.getId().equals(targetUser.getId())
                && !request.getEnabled()) {

            throw new BadRequestException(
                    "You cannot disable your own account.");
        }

        // Last active admin cannot be disabled
        if (targetUser.getRole() == Role.ADMIN
                && !request.getEnabled()
                && userRepository.countByRoleAndEnabledTrue(Role.ADMIN) == 1) {

            throw new BadRequestException(
                    "Cannot disable the last active admin.");
        }

        targetUser.setEnabled(request.getEnabled());

        User updatedUser = userRepository.save(targetUser);

        return userMapper.toResponse(updatedUser);
    }

    @Override
    public void deleteUser(Long id) {

        User currentUser = currentUserService.getCurrentUser();

        User targetUser = getUser(id);

        // Admin cannot delete himself
        if (currentUser.getId().equals(targetUser.getId())) {
            throw new BadRequestException(
                    "You cannot delete your own account.");
        }

        // Last admin cannot be deleted
        if (targetUser.getRole() == Role.ADMIN
                && userRepository.countByRole(Role.ADMIN) == 1) {

            throw new BadRequestException(
                    "Cannot delete the last admin.");
        }

        userRepository.delete(targetUser);
    }

    /**
     * Helper method to fetch user by id.
     */
    private User getUser(Long id) {

        return userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found with id : " + id));
    }
}