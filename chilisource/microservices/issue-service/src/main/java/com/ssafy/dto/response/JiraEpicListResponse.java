package com.ssafy.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class JiraEpicListResponse {
    private List<JiraEpicResponse> issues;

    @Builder
    public JiraEpicListResponse(List<JiraEpicResponse> issues) {
        this.issues = issues;
    }
}
