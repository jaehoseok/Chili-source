package com.ssafy.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
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
