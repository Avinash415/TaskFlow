package com.taskflow.backend.service;

import com.taskflow.backend.dto.request.UserRequestDTO;
import com.taskflow.backend.dto.response.UserResponseDTO;

import java.util.List;

public interface UserService {

    UserResponseDTO createUser(UserRequestDTO request);

    List<UserResponseDTO> getAllUsers();

    UserResponseDTO getUserById(Long id);

    UserResponseDTO updateUser(Long id,
                               UserRequestDTO request);

    void deleteUser(Long id);

}