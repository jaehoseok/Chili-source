package com.ssafy.controller;

import com.ssafy.service.UserProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/team")
public class TeamController {
    private final UserProjectService userProjectService;

    // 프로젝트에 팀원 초대
    // 프로젝트 팀원 정보 수정
    // 프로젝트 팀원 조회
    // 프로젝트에서 나가기
    // 프로젝트에 팀원 강퇴
}
