package com.ssafy.dto.response.jira;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class JiraTodoIssueAssigneeResponse {
    private String accountId;

    private String emailAddress;

    private String displayName;

    @Builder
    public JiraTodoIssueAssigneeResponse(String accountId, String emailAddress, String displayName) {
        this.accountId = accountId;
        this.emailAddress = emailAddress;
        this.displayName = displayName;
    }
}
