package com.taskflow.backend.service;

import com.taskflow.backend.dto.request.ProjectRequestDTO;
import com.taskflow.backend.dto.response.ProjectResponseDTO;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface ProjectService {

    ProjectResponseDTO createProject(ProjectRequestDTO request, Authentication authentication);

    List<ProjectResponseDTO> getMyProjects(Authentication authentication);

    ProjectResponseDTO getProjectById(Long id, Authentication authentication);

    ProjectResponseDTO updateProject(Long id, ProjectRequestDTO request, Authentication authentication);

    void deleteProject(Long id, Authentication authentication);
}