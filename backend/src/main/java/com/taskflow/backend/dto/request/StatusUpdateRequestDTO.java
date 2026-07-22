package com.taskflow.backend.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StatusUpdateRequestDTO {

    @NotNull(message = "Status is required")
    private Boolean enabled;

}