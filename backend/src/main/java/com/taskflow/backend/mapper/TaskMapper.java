package com.taskflow.backend.mapper;

import com.taskflow.backend.dto.request.TaskRequestDTO;
import com.taskflow.backend.dto.response.TaskResponseDTO;
import com.taskflow.backend.entity.Task;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TaskMapper {

    Task toEntity(TaskRequestDTO dto);

    TaskResponseDTO toResponse(Task entity);

}