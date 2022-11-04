package com.ssafy.dto.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@ApiModel(value = "미들 버킷 정보")
public class IssueListResponse {
    @ApiModelProperty(value = "미들 버킷 id")
    private Long middleBucketId;

    @ApiModelProperty(value = "미들 버킷 이름")
    private String middleBucketName;

    @ApiModelProperty(value = "미들 버킷 내의 이슈들 정보")
    private List<IssueResponse> issueList;

    @Builder
    public IssueListResponse(Long middleBucketId, String middleBucketName, List<IssueResponse> issueList) {
        this.middleBucketId = middleBucketId;
        this.middleBucketName = middleBucketName;
        this.issueList = issueList;
    }
}
