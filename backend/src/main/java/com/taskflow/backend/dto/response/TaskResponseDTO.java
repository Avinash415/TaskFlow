package com.taskflow.backend.dto.response;

import com.taskflow.backend.enums.TaskPriority;
import com.taskflow.backend.enums.TaskStatus;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TaskResponseDTO {

    private Long id;
    private String title;
    private String description;
    private LocalDate dueDate;
    private TaskPriority priority;
    private TaskStatus status;
    private Long projectId;
    private Long categoryId;
    private String projectName;
    private String categoryName;
}