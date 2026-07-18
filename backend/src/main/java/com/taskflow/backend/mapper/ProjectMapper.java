package com.taskflow.backend.mapper;

import com.taskflow.backend.dto.request.ProjectRequestDTO;
import com.taskflow.backend.dto.response.ProjectResponseDTO;
import com.taskflow.backend.entity.Project;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProjectMapper {

    Project toEntity(ProjectRequestDTO dto);

    ProjectResponseDTO toResponse(Project entity);

}