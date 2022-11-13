package com.ssafy.dto.request.jira.bulk;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class JiraIssueDescriptionCreateRequest {
    @ApiModelProperty(hidden = true)
    private String type;

    @ApiModelProperty(hidden = true)
    private Integer version;

    private List<JiraIssueDescriptionContentCreateRequest> content;

    @Builder
    public JiraIssueDescriptionCreateRequest(List<JiraIssueDescriptionContentCreateRequest> content) {
        this.type = "doc";
        this.version = 1;
        this.content = content;
    }
}
