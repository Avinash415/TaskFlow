package com.taskflow.backend.mapper;

import com.taskflow.backend.dto.request.CategoryRequestDTO;
import com.taskflow.backend.dto.response.CategoryResponseDTO;
import com.taskflow.backend.entity.Category;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CategoryMapper {

    Category toEntity(CategoryRequestDTO dto);

    CategoryResponseDTO toResponse(Category entity);

}