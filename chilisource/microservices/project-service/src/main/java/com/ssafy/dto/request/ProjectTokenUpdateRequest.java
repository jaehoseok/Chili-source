package com.ssafy.dto.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProjectTokenUpdateRequest {
    private Long projectId;

    private String name;

    private String detail;

    @Builder
    public ProjectTokenUpdateRequest(Long projectId, String name, String detail) {
        this.projectId = projectId;
        this.name = name;
        this.detail = detail;
    }
}
