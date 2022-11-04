package com.ssafy.dto.response.jira.epic;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class JiraEpicResponse {
    private String key;
    private FieldResponse fields;

    @Builder
    public JiraEpicResponse(String key, FieldResponse fields) {
        this.key = key;
        this.fields = fields;
    }
}
