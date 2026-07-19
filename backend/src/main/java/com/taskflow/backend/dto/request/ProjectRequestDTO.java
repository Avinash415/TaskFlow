package com.taskflow.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ProjectRequestDTO {

    @NotBlank(message = "Project name is required")
    private String name;

    @Size(max = 500, message = "Description cannot exceed 500 characters")
    private String description;
}