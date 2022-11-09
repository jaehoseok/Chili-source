package com.ssafy.service;

import com.ssafy.client.AuthServiceClient;
import com.ssafy.client.ProjectServiceClient;
import com.ssafy.client.SsafyGitlabClient;
import com.ssafy.dto.gitlab.Branch;
import com.ssafy.dto.response.*;
import com.ssafy.exception.InternalServerErrorException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.ssafy.exception.InternalServerErrorException.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class SsafyGitlabServiceImpl implements SsafyGitlabService {
    private final AuthServiceClient authServiceClient;
    private final ProjectServiceClient projectServiceClient;
    private final SsafyGitlabClient ssafyGitlabClient;

    @Override
    public List<GitlabRepositoryResponse> findRepositoryList(String accessToken, String tokenCodeId, Long userId) {
        TokenResponse tokenResponse = authServiceClient.findToken(accessToken, tokenCodeId);
        List<GitlabRepositoryResponse> repositories = ssafyGitlabClient.findRepository(tokenResponse.getValue());
        return repositories;
    }

    @Override
    public GitlabDefaultResponse findMergeRequest(String accessToken, String tokenCodeId, Long projectId, Long userId) {
        TokenResponse tokenResponse = authServiceClient.findToken(accessToken, tokenCodeId);
        ProjectResponse projectResponse = projectServiceClient.findProject(projectId);
        List<Branch> branches = ssafyGitlabClient.findBranch(tokenResponse.getValue(), projectResponse.getGitRepo());
        if (branches.isEmpty()) throw new InternalServerErrorException(GIT_COMMUNICATION_ERROR);
        List<GitlabMergeRequestResponse> gitlabMergeRequestResponses = ssafyGitlabClient.findMergeRequest(tokenResponse.getValue(), projectResponse.getGitRepo());
        GitlabDefaultResponse gitlabDefaultResponse = GitlabDefaultResponse.builder()
                .branchs(branches)
                .mergeRequestResponses(gitlabMergeRequestResponses)
                .build();
        return gitlabDefaultResponse;
    }

    @Override
    public List<GitlabCommitResponse> findCommits(String accessToken, String tokenCodeId, Long projectId, Long userId, String branch) {
        TokenResponse tokenResponse = authServiceClient.findToken(accessToken, tokenCodeId);
        if (tokenResponse.getValue() == null) throw new InternalServerErrorException(AUTH_COMMUNICATION_ERROR);
        ProjectResponse projectResponse = projectServiceClient.findProject(projectId);
        if (projectResponse.getId() == null) throw new InternalServerErrorException(PROJECT_COMMUNICATION_ERROR);
        return ssafyGitlabClient.findCommits(tokenResponse.getValue(), projectResponse.getGitRepo(), branch);
    }
}
