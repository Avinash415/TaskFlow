package com.taskflow.backend.mapper;

import com.taskflow.backend.dto.request.UserRequestDTO;
import com.taskflow.backend.dto.response.UserResponseDTO;
import com.taskflow.backend.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User toEntity(UserRequestDTO dto);

    UserResponseDTO toResponse(User entity);

}