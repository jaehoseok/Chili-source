package com.ssafy.dto.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProjectCreateRequest {
    private String name;

    private String description;

    private String image;

    @Builder
    public ProjectCreateRequest(String name, String description, String image) {
        this.name = name;
        this.description = description;
        this.image = image;
    }
}
