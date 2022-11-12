package com.ssafy.dto.request;

import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@ApiModel(value = "프로젝트 내 해당 이슈번호 간트 업데이트")
public class AllGanttChartUpdateRequest {
    private Long projectId;

    private String issueCode;

    private String summary;

    @Builder
    public AllGanttChartUpdateRequest(Long projectId, String issueCode, String summary) {
        this.projectId = projectId;
        this.issueCode = issueCode;
        this.summary = summary;
    }
}
