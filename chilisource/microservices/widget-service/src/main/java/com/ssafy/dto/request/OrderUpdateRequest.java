package com.ssafy.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class OrderUpdateRequest {
    private Long projectId;

    private String order;
}
