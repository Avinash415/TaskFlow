package com.taskflow.backend.service;

import com.taskflow.backend.dto.request.LoginRequestDTO;
import com.taskflow.backend.dto.request.RegisterRequestDTO;
import com.taskflow.backend.dto.response.AuthenticationResponseDTO;

public interface AuthenticationService {

    AuthenticationResponseDTO register(RegisterRequestDTO request);

    AuthenticationResponseDTO login(LoginRequestDTO request);

}