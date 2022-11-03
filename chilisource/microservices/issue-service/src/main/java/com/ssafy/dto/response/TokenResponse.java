package com.ssafy.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class TokenResponse {
    private Long id;

    private String value;

    private String email;

    private String tokenCodeId;

    @Builder
    public TokenResponse(Long id, String value, String email, String tokenCodeId) {
        this.id = id;
        this.value = value;
        this.email = email;
        this.tokenCodeId = tokenCodeId;
    }
}
