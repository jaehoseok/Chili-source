package com.ssafy.dto.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProjectUpdateRequest {
    private Long id;

    private String name;

    private String description;

    @Builder
    public ProjectUpdateRequest(Long id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }
}
