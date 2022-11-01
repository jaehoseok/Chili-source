package com.ssafy.dto.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProjectCreateRequest {
    private String name;

    private String description;

    @Builder
    public ProjectCreateRequest(String name, String description) {
        this.name = name;
        this.description = description;
    }
}
