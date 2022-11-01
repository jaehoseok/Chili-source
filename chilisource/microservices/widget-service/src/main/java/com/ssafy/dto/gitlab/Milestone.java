package com.ssafy.dto.gitlab;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class Milestone {
    private Long id;
    private Long iid;
    private Long project_id;
    private String title;
    private String description;
    private String state;
    private LocalDateTime created_at;
    private LocalDateTime updated_at;
    private LocalDate due_date;
    private LocalDate start_date;
    private String web_url;
}
