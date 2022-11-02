package com.ssafy.dto.request;

import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@ApiModel(value = "토큰 정보", description = "설명")
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
