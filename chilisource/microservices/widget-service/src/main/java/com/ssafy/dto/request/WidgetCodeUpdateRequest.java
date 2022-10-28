package com.ssafy.dto.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class WidgetCodeUpdateRequest {
    private String id;

    private String requestUrl;

    private String detailRequestUrl;

    @Builder
    public WidgetCodeUpdateRequest(String id, String requestUrl, String detailRequestUrl){
        this.id = id;
        this.requestUrl = requestUrl;
        this.detailRequestUrl = detailRequestUrl;
    }
}
