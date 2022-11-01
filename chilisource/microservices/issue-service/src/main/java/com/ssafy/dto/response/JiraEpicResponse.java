package com.ssafy.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class JiraEpicResponse {
    private String id;
    private String key;
    private FieldResponse fields;

    @Builder
    public JiraEpicResponse(String id, String key, FieldResponse fields) {
        this.id = id;
        this.key = key;
        this.fields = fields;
    }
}
