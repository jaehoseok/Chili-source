package com.ssafy.dto.response.jira;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class JiraTodoIssueResponse {
    private String id;

    private String key;

    // 이슈 타입과 에픽 링크
    private JiraTodoIssueFieldsResponse fields;

    @Builder
    public JiraTodoIssueResponse(String id, String key, JiraTodoIssueFieldsResponse fields) {
        this.id = id;
        this.key = key;
        this.fields = fields;
    }
}
