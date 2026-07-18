package com.taskflow.backend.service.impl;

import com.taskflow.backend.dto.request.UserRequestDTO;
import com.taskflow.backend.dto.response.UserResponseDTO;
import com.taskflow.backend.entity.User;
import com.taskflow.backend.exception.DuplicateResourceException;
import com.taskflow.backend.exception.ResourceNotFoundException;
import com.taskflow.backend.mapper.UserMapper;
import com.taskflow.backend.repository.UserRepository;
import com.taskflow.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    public UserResponseDTO createUser(UserRequestDTO request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException(
                    "Email already exists");
        }

        User user = userMapper.toEntity(request);

        user.setEnabled(true);

        User savedUser = userRepository.save(user);

        return userMapper.toResponse(savedUser);
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

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"));

        return userMapper.toResponse(user);
    }

    @Override
    public UserResponseDTO updateUser(Long id,
                                      UserRequestDTO request) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"));

        userMapper.updateEntity(request, user);

        User updated = userRepository.save(user);

        return userMapper.toResponse(updated);
    }

    @Override
    public void deleteUser(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"));

        userRepository.delete(user);
    }
}