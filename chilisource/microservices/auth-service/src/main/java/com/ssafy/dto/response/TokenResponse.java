package com.ssafy.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TokenResponse {
    private Long id;

    private String value;

    private Long tokenCodeId;

    @Builder
    public TokenResponse(Long id, String value, Long tokenCodeId) {
        this.id = id;
        this.value = value;
        this.tokenCodeId = tokenCodeId;
    }
}
