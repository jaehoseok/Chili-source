package com.ssafy.client;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class googleProfile {
    private Long id;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Properties{
        private String name;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class googleAccount{
        private String age_range;
    }
}
