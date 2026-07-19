package com.taskflow.backend.service.impl;

import com.taskflow.backend.dto.request.CategoryRequestDTO;
import com.taskflow.backend.dto.response.CategoryResponseDTO;
import com.taskflow.backend.entity.Category;
import com.taskflow.backend.exception.DuplicateResourceException;
import com.taskflow.backend.exception.ResourceNotFoundException;
import com.taskflow.backend.mapper.CategoryMapper;
import com.taskflow.backend.repository.CategoryRepository;
import com.taskflow.backend.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository repository;

    private final CategoryMapper mapper;

    @Override
    public CategoryResponseDTO createCategory(CategoryRequestDTO request) {

        if(repository.existsByName(request.getName())){

            throw new DuplicateResourceException(
                    "Category already exists."
            );

        }

        Category category = mapper.toEntity(request);

        Category saved = repository.save(category);

        return mapper.toResponse(saved);

    }

    @Override
    public List<CategoryResponseDTO> getAllCategories() {

        return repository.findAll()
                .stream()
                .map(mapper::toResponse)
                .toList();

    }

    @Override
    public CategoryResponseDTO getCategoryById(Long id) {

        Category category = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Category not found."
                        ));

        return mapper.toResponse(category);

    }

    @Override
    public CategoryResponseDTO updateCategory(Long id,
                                              CategoryRequestDTO request) {

        Category category = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Category not found."
                        ));

        category.setName(request.getName());

        Category updated = repository.save(category);

        return mapper.toResponse(updated);

    }

    @Override
    public void deleteCategory(Long id) {

        Category category = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Category not found."
                        ));

        repository.delete(category);

    }
}