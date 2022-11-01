package com.ssafy.dto.response;

import com.ssafy.dto.gitlab.Branch;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class GitlabDefaultResponse {
    private List<Branch> branchs;

    private List<GitlabMergeRequestResponse> mergeRequestResponses;

    @Builder
    public GitlabDefaultResponse(List<Branch> branchs, List<GitlabMergeRequestResponse> mergeRequestResponses) {
        this.branchs = branchs;
        this.mergeRequestResponses = mergeRequestResponses;
    }
}
