package com.ssafy.dto.response;

import com.ssafy.dto.gitlab.GitlabUser;
import com.ssafy.dto.gitlab.Milestone;
import com.ssafy.dto.gitlab.TaskCompletionStatus;
import com.ssafy.dto.gitlab.TimeStats;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GitlabMergeRequestResponse {
    private Long id;

    private Long iid;

    private Long project_id;

    private String title;

    private String description;

    private String state;

    private GitlabUser merged_by;

    private GitlabUser merge_user;

    private GitlabUser author;

    private GitlabUser assignee;

    private List<GitlabUser> assignees;

    private List<GitlabUser> reviewers;

    private Long source_project_id;

    private Long target_project_id;

    private List<String> labels;

    private Boolean draft;

    private Boolean work_in_progress;

    private Milestone milestone;

    private Boolean merge_when_pipeline_succeeds;

    private String merge_status;

    private String detailed_merge_status;

    private String sha;

    private String merge_commit_sha;

    private String squash_commit_sha;

    private Long user_notes_count;

    private String discussion_locked;

    private Boolean should_remove_source_branch;

    private Boolean force_remove_source_branch;

    private Boolean allow_collaboration;

    private Boolean allow_maintainer_to_push;

    private String web_url;

    private Object references;

    private TimeStats time_stats;

    private Boolean squash;

    private TaskCompletionStatus task_completion_status;

    private Boolean has_conflicts;

    private Boolean blocking_discussions_resolves;
}

