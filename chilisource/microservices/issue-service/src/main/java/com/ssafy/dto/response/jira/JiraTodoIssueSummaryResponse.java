package com.ssafy.dto.response.jira;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class JiraTodoIssueSummaryResponse {
    private String summary;

    @Builder
    public JiraTodoIssueSummaryResponse(String summary) {
        this.summary = summary;
    }
}
