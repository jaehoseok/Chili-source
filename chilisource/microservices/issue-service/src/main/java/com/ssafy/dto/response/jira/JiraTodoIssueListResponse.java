package com.ssafy.dto.response.jira;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class JiraTodoIssueListResponse {
    private List<JiraTodoIssueResponse> list;

    @Builder
    public JiraTodoIssueListResponse(List<JiraTodoIssueResponse> list) {
        this.list = list;
    }
}
