package com.taskflow.backend.dto.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardResponseDTO {

    // Statistics
    private Long totalProjects;

    private Long totalTasks;

    private Long completedTasks;

    private Long inProgressTasks;

    private Long pendingTasks;

    private Long highPriorityTasks;

    private Long mediumPriorityTasks;

    private Long lowPriorityTasks;

    private Long totalCategories;

    // Recent Tasks
    private List<TaskResponseDTO> recentTasks;

}