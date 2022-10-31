package com.ssafy.service;

import com.ssafy.client.AuthServiceClient;
import com.ssafy.client.ProjectServiceClient;
import com.ssafy.client.SsafyGitlabClient;
import com.ssafy.dto.response.GitlabCommitResponse;
import com.ssafy.dto.response.GitlabMergeRequestResponse;
import com.ssafy.dto.response.ProjectResponse;
import com.ssafy.dto.response.TokenResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SsafyGitlabServiceImpl implements SsafyGitlabService {
    private final AuthServiceClient authServiceClient;
    private final ProjectServiceClient projectServiceClient;
    private final SsafyGitlabClient ssafyGitlabClient;

    @Override
    public List<GitlabMergeRequestResponse> findMergeRequest(String accessToken, String tokenCodeId, Long projectId, Long userId) {
        TokenResponse tokenResponse = authServiceClient.findToken(accessToken, tokenCodeId);
        ProjectResponse projectResponse = projectServiceClient.findProject(projectId);
        return ssafyGitlabClient.findMergeRequest(tokenResponse.getValue(), projectResponse.getGitRepo());
    }

    @Override
    public List<GitlabCommitResponse> findCommits(String accessToken, String tokenCodeId, Long projectId, Long userId, String branch) {
        TokenResponse tokenResponse = authServiceClient.findToken(accessToken, tokenCodeId);
        ProjectResponse projectResponse = projectServiceClient.findProject(projectId);
        return ssafyGitlabClient.findCommits(tokenResponse.getValue(), projectResponse.getGitRepo(), branch);
    }
}
