package com.taskflow.backend.service.impl;

import com.taskflow.backend.dto.request.ProjectRequestDTO;
import com.taskflow.backend.dto.response.ProjectResponseDTO;
import com.taskflow.backend.entity.Project;
import com.taskflow.backend.entity.User;
import com.taskflow.backend.exception.ResourceNotFoundException;
import com.taskflow.backend.mapper.ProjectMapper;
import com.taskflow.backend.repository.ProjectRepository;
import com.taskflow.backend.repository.UserRepository;
import com.taskflow.backend.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;
    private final UserRepository userRepository;

    @Override
    public ProjectResponseDTO createProject(ProjectRequestDTO request, Authentication authentication) {
        User currentUser = getCurrentUser(authentication);

        Project project = projectMapper.toEntity(request);
        project.setUser(currentUser);

        Project saved = projectRepository.save(project);
        return projectMapper.toResponse(saved);
    }

    @Override
    public List<ProjectResponseDTO> getMyProjects(Authentication authentication) {
        User currentUser = getCurrentUser(authentication);
        return projectRepository.findByUserId(currentUser.getId())
                .stream()
                .map(projectMapper::toResponse)
                .toList();
    }

    @Override
    public ProjectResponseDTO getProjectById(Long id, Authentication authentication) {
        Project project = findProjectByIdAndUser(id, authentication);
        return projectMapper.toResponse(project);
    }

    @Override
    public ProjectResponseDTO updateProject(Long id, ProjectRequestDTO request, Authentication authentication) {
        Project project = findProjectByIdAndUser(id, authentication);
        projectMapper.updateEntity(request, project);
        Project updated = projectRepository.save(project);
        return projectMapper.toResponse(updated);
    }

    @Override
    public void deleteProject(Long id, Authentication authentication) {
        Project project = findProjectByIdAndUser(id, authentication);
        projectRepository.delete(project);
    }

    private User getCurrentUser(Authentication authentication) {
        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    private Project findProjectByIdAndUser(Long id, Authentication authentication) {
        User currentUser = getCurrentUser(authentication);
        return projectRepository.findById(id)
                .filter(p -> p.getUser().getId().equals(currentUser.getId()))
                .orElseThrow(() -> new ResourceNotFoundException("Project not found or access denied"));
    }
}