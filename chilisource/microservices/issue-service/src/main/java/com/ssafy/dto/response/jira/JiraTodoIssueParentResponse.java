package com.ssafy.dto.response.jira;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class JiraTodoIssueParentResponse {
    private String id;

    private String key;

    private JiraTodoIssueParentFieldsResponse fields;

    @Builder
    public JiraTodoIssueParentResponse(String id, String key, JiraTodoIssueParentFieldsResponse fields) {
        this.id = id;
        this.key = key;
        this.fields = fields;
    }
}
