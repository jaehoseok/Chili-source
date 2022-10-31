package com.ssafy.client;

import com.ssafy.dto.response.GitlabCommitResponse;
import com.ssafy.dto.response.GitlabMergeRequestResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "ssafy-gitlab-service", url = "https://lab.ssafy.com/api/v4")
public interface SsafyGitlabClient {
    @GetMapping("/projects/{project_id}/merge_requests")
    List<GitlabMergeRequestResponse> findMergeRequest(
            @RequestHeader("PRIVATE-TOKEN") String ssafyGitlabToken,
            @PathVariable String project_id);

    @GetMapping("/projects/{project_id}/repository/commits")
    List<GitlabCommitResponse> findCommits(
            @RequestHeader("PRIVATE-TOKEN") String ssafyGitlabToken,
            @PathVariable String project_id,
            @RequestParam("ref_name") String ref_name);
}
