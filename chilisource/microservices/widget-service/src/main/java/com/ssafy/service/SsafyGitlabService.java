package com.ssafy.service;

import com.ssafy.dto.response.GitlabCommitResponse;
import com.ssafy.dto.response.GitlabMergeRequestResponse;

import java.util.List;

public interface SsafyGitlabService {
    // 해당 프로젝트 머지 리퀘스트 내역
    List<GitlabMergeRequestResponse> findMergeRequest(String accessToken, String tokenCodeId, Long projectId, Long userId);

    // 해당 브랜치 커밋 내역
    List<GitlabCommitResponse> findCommits(String accessToken, String tokenCodeId, Long projectId, Long userId, String branch);
}
