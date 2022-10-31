package com.ssafy.dto.gitlab;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TimeStats {
    private Long time_estimate;
    private Long total_time_spent;
    private Long human_time_estimate;
    private Long human_total_time_spent;
}
