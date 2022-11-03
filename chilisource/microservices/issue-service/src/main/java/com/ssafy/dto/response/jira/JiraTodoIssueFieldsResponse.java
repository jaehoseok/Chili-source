package com.ssafy.dto.response.jira;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class JiraTodoIssueFieldsResponse {
    private JiraTodoIssueTypeResponse issuetype;

    private JiraTodoIssueParentResponse parent;

    @Builder
    public JiraTodoIssueFieldsResponse(JiraTodoIssueTypeResponse issuetype, JiraTodoIssueParentResponse parent) {
        this.issuetype = issuetype;
        this.parent = parent;
    }
}
