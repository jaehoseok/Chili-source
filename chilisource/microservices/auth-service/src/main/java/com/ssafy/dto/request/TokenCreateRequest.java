package com.ssafy.dto.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TokenCreateRequest {
    private String value;

    private String tokenCodeId;

    private String email;

    @Builder
    public TokenCreateRequest(String value, String tokenCodeId, String email) {
        this.value = value;
        this.tokenCodeId = tokenCodeId;
        this.email = email;
    }
}
