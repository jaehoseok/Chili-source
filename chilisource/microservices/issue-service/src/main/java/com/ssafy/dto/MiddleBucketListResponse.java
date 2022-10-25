package com.ssafy.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class MiddleBucketListResponse {
    Long middleBucketId;
    List<IssueResponse> issueList;
}
