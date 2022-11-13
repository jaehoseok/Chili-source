package com.ssafy.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GitlabRepositoryResponse {
    private Long id;

    private String description;

    private String name;

    private String name_with_namespace;

    private String path;

    private String path_with_namespace;

    private String default_branch;

    private String ssh_rul_to_repo;

    private String http_url_to_repo;

    private String web_url;

    @Builder
    public GitlabRepositoryResponse(Long id, String description, String name, String name_with_namespace, String path, String path_with_namespace, String default_branch, String ssh_rul_to_repo, String http_url_to_repo, String web_url) {
        this.id = id;
        this.description = description;
        this.name = name;
        this.name_with_namespace = name_with_namespace;
        this.path = path;
        this.path_with_namespace = path_with_namespace;
        this.default_branch = default_branch;
        this.ssh_rul_to_repo = ssh_rul_to_repo;
        this.http_url_to_repo = http_url_to_repo;
        this.web_url = web_url;
    }

}
