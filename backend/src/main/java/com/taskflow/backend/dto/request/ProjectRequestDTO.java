package com.taskflow.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ProjectRequestDTO {

    @NotBlank
    private String name;

    private String description;
}