package com.ssafy.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TokenCodeResponse {
    private String id;

    @Builder
    public TokenCodeResponse(String id) {
        this.id = id;
    }
}
