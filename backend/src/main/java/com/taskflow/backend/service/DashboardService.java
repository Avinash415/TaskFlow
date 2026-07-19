package com.taskflow.backend.service;

import com.taskflow.backend.dto.response.DashboardResponseDTO;
import org.springframework.security.core.Authentication;

public interface DashboardService {

    DashboardResponseDTO getDashboard(Authentication authentication);

}