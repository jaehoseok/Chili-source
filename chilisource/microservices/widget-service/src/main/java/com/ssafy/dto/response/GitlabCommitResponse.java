package com.ssafy.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
public class GitlabCommitResponse {
    private String id;
    private String short_id;
    private String author_name;
    private String author_email;
    private String committer_name;
    private String committer_email;
    private String created_at;
    private String message;
    private List<String> parent_ids;
    private String web_url;

    @Builder
    public GitlabCommitResponse(String id, String short_id, String author_name, String author_email, String committer_name, String committer_email, String created_at, String message, List<String> parent_ids, String web_url) {
        this.id = id;
        this.short_id = short_id;
        this.author_name = author_name;
        this.author_email = author_email;
        this.committer_name = committer_name;
        this.committer_email = committer_email;
        this.created_at = created_at;
        this.message = message;
        this.parent_ids = parent_ids;
        this.web_url = web_url;
    }

}
