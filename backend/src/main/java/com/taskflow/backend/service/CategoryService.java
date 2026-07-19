package com.taskflow.backend.service;

import com.taskflow.backend.dto.request.CategoryRequestDTO;
import com.taskflow.backend.dto.response.CategoryResponseDTO;

import java.util.List;

public interface CategoryService {

    CategoryResponseDTO createCategory(CategoryRequestDTO request);

    List<CategoryResponseDTO> getAllCategories();

    CategoryResponseDTO getCategoryById(Long id);

    CategoryResponseDTO updateCategory(Long id,
                                       CategoryRequestDTO request);

    void deleteCategory(Long id);

}