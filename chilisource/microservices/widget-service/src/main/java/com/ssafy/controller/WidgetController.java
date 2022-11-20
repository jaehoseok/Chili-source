package com.ssafy.controller;

import com.ssafy.config.WidgetType;
import com.ssafy.config.loginuser.LoginUser;
import com.ssafy.config.loginuser.User;
import com.ssafy.dto.request.*;
import com.ssafy.service.SsafyGitlabService;
import com.ssafy.service.WidgetCodeService;
import com.ssafy.service.WidgetService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.apache.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Api(tags = "위젯")
public class WidgetController {
    private final WidgetService widgetService;
    private final WidgetCodeService widgetCodeService;
    private final SsafyGitlabService ssafyGitlabService;

    @GetMapping("/widget-codes")
    @ApiOperation(value = "위젯 코드 리스트 조회")
    public ResponseEntity<?> getWidgetCodeList() {
        return ResponseEntity.ok(widgetCodeService.getWidgetCodeList());
    }

    @PostMapping("/widget-codes")
    @ApiOperation(value = "위젯 코드 생성")
    public ResponseEntity<?> createWidgetCode(
            @RequestBody WidgetCodeCreateRequest request
    ) {
        widgetCodeService.createWidgetCode(request);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/widget-codes")
    @ApiOperation(value = "위젯 코드 수정")
    public ResponseEntity<?> updateWidgetCode(
            @RequestBody WidgetCodeUpdateRequest request
    ) {
        widgetCodeService.updateWidgetCode(request);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/widget-codes/{widgetCodeId}")
    @ApiOperation(value = "위젯 코드 삭제")
    public ResponseEntity<?> deleteWidgetCode(
            @ApiParam(value = "위젯 코드 pk") @PathVariable(name = "widgetCodeId") String widgetCodeId
    ) {
        widgetCodeService.deleteWidgetCode(widgetCodeId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/widgets/{projectId}")
    @ApiOperation(value = "위젯 리스트 조회")
    public ResponseEntity<?> getWidgetList(
            @ApiParam(value = "프로젝트 pk") @PathVariable(name = "projectId") Long projectId
    ) {
        return ResponseEntity.ok(widgetService.getWidgetList(projectId));
    }

    @PostMapping("/widgets")
    @ApiOperation(value = "위젯 생성")
    public ResponseEntity<?> createWidget(
            @RequestBody WidgetCreateRequest request,
            @LoginUser User user
    ) {
        widgetService.createWidget(request, user.getId());
        return ResponseEntity.ok().build();
    }

    @PutMapping("/widgets/loc")
    @ApiOperation(value = "위젯 순서 수정")
    public ResponseEntity<?> updateLocWidget(
            @RequestBody List<WidgetLocUpdateRequest> requests,
            @LoginUser User user
    ) {
        widgetService.updateLoc(requests, user.getId());
        return ResponseEntity.ok().build();
    }

    @PutMapping("/widgets/{widgetId}")
    @ApiOperation(value = "위젯 수정")
    public ResponseEntity<?> updateWidget(
            @ApiParam(value = "위젯 pk") @PathVariable(name = "widgetId") Long widgetId,
            @RequestBody WidgetUpdateRequest request,
            @LoginUser User user
    ) {
        widgetService.updateWidget(request, widgetId, user.getId());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/widgets/{widgetId}")
    @ApiOperation(value = "위젯 삭제")
    public ResponseEntity<?> deleteWidget(
            @ApiParam(value = "위젯 pk") @PathVariable(name = "widgetId") Long widgetId,
            @LoginUser User user
    ) {
        widgetService.deleteWidget(widgetId, user.getId());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/widgets/all/{projectId}")
    @ApiOperation(value = "프로젝트에 생성된 위젯 삭제")
    public ResponseEntity<?> deleteAllWidget(
            @ApiParam(value = "프로젝트 pk") @PathVariable(name = "projectId") Long projectId
    ) {
        widgetService.deleteAllWidget(projectId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/git/repositories")
    @ApiOperation(value = "연동한 GIT에 있는 Repository 리스트 조회")
    public ResponseEntity<?> getGitRepository(
            HttpServletRequest request,
            @LoginUser User user,
            @ApiParam(value = "토큰 코드 pk") @RequestParam(required = false, name = "tokenCodeId") String tokenCodeId
    ) {
        String accessToken = request.getHeader(HttpHeaders.AUTHORIZATION);
        return ResponseEntity.ok(ssafyGitlabService.findRepositoryList(accessToken, tokenCodeId, user.getId()));
    }

    @GetMapping("/widgets/small/{widgetType}")
    @ApiOperation(value = "프로젝트에 생성된 GIT 위젯 정보 조회")
    public ResponseEntity<?> getSmallWidget(
            HttpServletRequest request,
            @LoginUser User user,
            @ApiParam(value = "프로젝트 pk") @RequestParam("projectId") Long projectId,
            @ApiParam(value = "위젯 타입 (SSAFYGITLAB, GITLAB, GITHUB)") @PathVariable("widgetType") String widgetType,
            @ApiParam(value = "토큰 코드 pk") @RequestParam(required = false, name = "tokenCodeId") String tokenCodeId,
            @ApiParam(value = "브랜치 (null일때는 MR 리스트)") @RequestParam(required = false, name = "branch") String branch
    ) {
        WidgetType type = WidgetType.valueOf(widgetType.toUpperCase());
        String accessToken = request.getHeader(HttpHeaders.AUTHORIZATION);
        switch (type) {
            case SSAFYGITLAB: {
                if (branch.isEmpty())
                    return ResponseEntity.ok(ssafyGitlabService.findMergeRequest(accessToken, tokenCodeId, projectId, user.getId()));
                else
                    return ResponseEntity.ok(ssafyGitlabService.findCommits(accessToken, tokenCodeId, projectId, user.getId(), branch));
            }
//            case GITLAB: {
//
//            }
//            case GITHUB: {
//
//            }
            case CLOCK:
            case WEBEX:
            case GATHER:
            case ZOOM:
            case FIGMA: {
                return ResponseEntity.ok(widgetService.getWidgetUrl(projectId, widgetType));
            }
            default: {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }
        }
    }
}
