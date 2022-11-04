package com.ssafy.dto.response.jira.todo;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class JiraTodoIssueReporterResponse {
    private String accountId;

    private String emailAddress;

    private String displayName;

    @Builder
    public JiraTodoIssueReporterResponse(String accountId, String emailAddress, String displayName) {
        this.accountId = accountId;
        this.emailAddress = emailAddress;
        this.displayName = displayName;
    }
}
