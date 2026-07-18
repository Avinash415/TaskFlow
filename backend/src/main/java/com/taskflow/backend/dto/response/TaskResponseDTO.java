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

    private TaskStatus status;

    private TaskPriority priority;

    private LocalDate dueDate;

    private Boolean completed;
}