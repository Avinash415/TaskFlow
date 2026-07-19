
package com.taskflow.backend.service.impl;

import com.taskflow.backend.dto.request.LoginRequestDTO;
import com.taskflow.backend.dto.request.RegisterRequestDTO;
import com.taskflow.backend.dto.response.AuthenticationResponseDTO;
import com.taskflow.backend.dto.response.UserResponseDTO;
import com.taskflow.backend.entity.User;
import com.taskflow.backend.enums.Role;
import com.taskflow.backend.exception.DuplicateResourceException;
import com.taskflow.backend.mapper.UserMapper;
import com.taskflow.backend.repository.UserRepository;
import com.taskflow.backend.security.service.JwtService;
import com.taskflow.backend.security.service.CustomUserDetails;
import com.taskflow.backend.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserMapper userMapper;

    @Override
    public AuthenticationResponseDTO register(RegisterRequestDTO request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Email already exists");
        }

        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .enabled(true)
                .build();

        User savedUser = userRepository.save(user);

        String token = jwtService.generateToken(
                new CustomUserDetails(savedUser));

        UserResponseDTO responseDTO = userMapper.toResponse(savedUser);

        return AuthenticationResponseDTO.builder()
                .token(token)
                .user(responseDTO)
                .build();
    }

    @Override
    public AuthenticationResponseDTO login(LoginRequestDTO request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()));

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();

        String token = jwtService.generateToken(
                new CustomUserDetails(user));

        UserResponseDTO responseDTO = userMapper.toResponse(user);

        return AuthenticationResponseDTO.builder()
                .token(token)
                .user(responseDTO)
                .build();
    }
}