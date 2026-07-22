package com.taskflow.backend.service;

import com.taskflow.backend.dto.request.RoleUpdateRequestDTO;
import com.taskflow.backend.dto.request.StatusUpdateRequestDTO;
import com.taskflow.backend.dto.response.AdminDashboardResponseDTO;
import com.taskflow.backend.dto.response.UserResponseDTO;

import java.util.List;

public interface AdminService {

    AdminDashboardResponseDTO getDashboard();

    List<UserResponseDTO> getAllUsers();

    UserResponseDTO getUserById(Long id);

    UserResponseDTO updateUserRole(Long id,
                                   RoleUpdateRequestDTO request);

    UserResponseDTO updateUserStatus(Long id,
                                     StatusUpdateRequestDTO request);

    void deleteUser(Long id);

}