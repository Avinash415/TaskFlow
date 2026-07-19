package com.taskflow.backend.controller;

import com.taskflow.backend.dto.request.CategoryRequestDTO;
import com.taskflow.backend.dto.response.CategoryResponseDTO;
import com.taskflow.backend.response.ApiResponse;
import com.taskflow.backend.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService service;

    @PostMapping
    public ResponseEntity<ApiResponse<CategoryResponseDTO>>
    createCategory(@Valid @RequestBody CategoryRequestDTO request){

        return ResponseEntity.ok(
                ApiResponse.<CategoryResponseDTO>builder()
                        .success(true)
                        .message("Category created successfully")
                        .data(service.createCategory(request))
                        .build()
        );
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<CategoryResponseDTO>>>
    getAllCategories(){

        return ResponseEntity.ok(
                ApiResponse.<List<CategoryResponseDTO>>builder()
                        .success(true)
                        .message("Categories fetched successfully")
                        .data(service.getAllCategories())
                        .build()
        );

    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CategoryResponseDTO>>
    getCategoryById(@PathVariable Long id){

        return ResponseEntity.ok(
                ApiResponse.<CategoryResponseDTO>builder()
                        .success(true)
                        .message("Category fetched successfully")
                        .data(service.getCategoryById(id))
                        .build()
        );

    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<CategoryResponseDTO>>
    updateCategory(@PathVariable Long id,
                   @Valid @RequestBody CategoryRequestDTO request){

        return ResponseEntity.ok(
                ApiResponse.<CategoryResponseDTO>builder()
                        .success(true)
                        .message("Category updated successfully")
                        .data(service.updateCategory(id,request))
                        .build()
        );

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>>
    deleteCategory(@PathVariable Long id){

        service.deleteCategory(id);

        return ResponseEntity.ok(
                ApiResponse.<Void>builder()
                        .success(true)
                        .message("Category deleted successfully")
                        .build()
        );

    }

}