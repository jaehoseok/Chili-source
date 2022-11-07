package com.ssafy.service;

import com.ssafy.client.AuthServiceClient;
import com.ssafy.client.ProjectServiceClient;
import com.ssafy.client.SsafyGitlabClient;
import com.ssafy.dto.gitlab.Branch;
import com.ssafy.dto.response.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class SsafyGitlabServiceImpl implements SsafyGitlabService {
    private final AuthServiceClient authServiceClient;
    private final ProjectServiceClient projectServiceClient;
    private final SsafyGitlabClient ssafyGitlabClient;

    @Override
    public GitlabDefaultResponse findMergeRequest(String accessToken, String tokenCodeId, Long projectId, Long userId) {
        TokenResponse tokenResponse = authServiceClient.findToken(accessToken.replace("Bearer ", ""), tokenCodeId);
        ProjectResponse projectResponse = projectServiceClient.findProject(projectId);

        List<Branch> branches = ssafyGitlabClient.findBranch(tokenResponse.getValue(), projectResponse.getGitRepo());
        if (branches.isEmpty()) log.error("[Widget] [findMergeRequest] ssafy gitlab feign error");
        List<GitlabMergeRequestResponse> gitlabMergeRequestResponses = ssafyGitlabClient.findMergeRequest(tokenResponse.getValue(), projectResponse.getGitRepo());
        GitlabDefaultResponse gitlabDefaultResponse = GitlabDefaultResponse.builder()
                .branchs(branches)
                .mergeRequestResponses(gitlabMergeRequestResponses)
                .build();
        return gitlabDefaultResponse;
    }

    @Override
    public List<GitlabCommitResponse> findCommits(String accessToken, String tokenCodeId, Long projectId, Long userId, String branch) {
        TokenResponse tokenResponse = authServiceClient.findToken(accessToken.replace("Bearer ", ""), tokenCodeId);
        if (tokenResponse.getValue() == null) log.error("[Widget] [findCommits] auth service feign error");
        ProjectResponse projectResponse = projectServiceClient.findProject(projectId);
        if (projectResponse.getId() == null) log.error("[Widget] [findCommits] project service feign error");
        return ssafyGitlabClient.findCommits(tokenResponse.getValue(), projectResponse.getGitRepo(), branch);
    }
}
