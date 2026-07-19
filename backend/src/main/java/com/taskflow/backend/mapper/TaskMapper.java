package com.taskflow.backend.mapper;

import com.taskflow.backend.dto.request.TaskRequestDTO;
import com.taskflow.backend.dto.response.TaskResponseDTO;
import com.taskflow.backend.entity.Task;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(
        componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface TaskMapper {

    @Mapping(target = "project", ignore = true)
    @Mapping(target = "category", ignore = true)
    @Mapping(target = "user", ignore = true)
    Task toEntity(TaskRequestDTO dto);

    @Mapping(target = "projectId", source = "project.id")
    @Mapping(target = "projectName", source = "project.name")
    @Mapping(target = "categoryId", source = "category.id")
    TaskResponseDTO toResponse(Task entity);

    @Mapping(target = "project", ignore = true)
    @Mapping(target = "category", ignore = true)
    void updateEntity(TaskRequestDTO dto, @MappingTarget Task entity);
}