package com.ssafy.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class IssueListResponse {
    private Long middleBucketId;

    private String middleBucketName;

    private List<IssueResponse> issueList;

    @Builder
    public IssueListResponse(Long middleBucketId, String middleBucketName, List<IssueResponse> issueList) {
        this.middleBucketId = middleBucketId;
        this.middleBucketName = middleBucketName;
        this.issueList = issueList;
    }
}
