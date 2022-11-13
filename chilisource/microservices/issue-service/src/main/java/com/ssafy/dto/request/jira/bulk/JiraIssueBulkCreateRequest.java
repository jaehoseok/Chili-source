package com.ssafy.dto.request.jira.bulk;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class JiraIssueBulkCreateRequest {
    @ApiModelProperty(hidden = true)
    private List<JiraIssueCreateRequest> issueUpdates;

    @Builder
    public JiraIssueBulkCreateRequest(List<JiraIssueCreateRequest> issueUpdates) {
        this.issueUpdates = issueUpdates;
    }
}
