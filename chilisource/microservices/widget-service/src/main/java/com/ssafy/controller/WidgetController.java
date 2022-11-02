package com.ssafy.controller;

import com.ssafy.config.WidgetType;
import com.ssafy.config.loginuser.LoginUser;
import com.ssafy.config.loginuser.User;
import com.ssafy.dto.request.*;
import com.ssafy.service.SsafyGitlabService;
import com.ssafy.service.WidgetCodeService;
import com.ssafy.service.WidgetService;
import lombok.RequiredArgsConstructor;
import org.apache.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class WidgetController {
    private final WidgetService widgetService;
    private final WidgetCodeService widgetCodeService;
    private final SsafyGitlabService ssafyGitlabService;

    @GetMapping("/widget-codes")
    public ResponseEntity<?> getWidgetCodeList() {
        return ResponseEntity.ok(widgetCodeService.getWidgetCodeList());
    }

    @PostMapping("/widget-codes")
    public ResponseEntity<?> createWidgetCode(
            @RequestBody WidgetCodeCreateRequest request
    ) {
        widgetCodeService.createWidgetCode(request);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/widget-codes")
    public ResponseEntity<?> updateWidgetCode(
            @RequestBody WidgetCodeUpdateRequest request
    ) {
        widgetCodeService.updateWidgetCode(request);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/widget-codes/{widgetCodeId")
    public ResponseEntity<?> deleteWidgetCode(
            @PathVariable(name = "widgetCodeId") String widgetCodeId
    ) {
        widgetCodeService.deleteWidgetCode(widgetCodeId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/widgets/{projectId}")
    public ResponseEntity<?> getWidgetList(
            @PathVariable(name = "projectId") Long projectId
    ) {
        return ResponseEntity.ok(widgetService.getWidgetList(projectId));
    }

    @PostMapping("/widgets")
    public ResponseEntity<?> createWidget(
            @RequestBody WidgetCreateRequest request
    ) {
        widgetService.createWidget(request);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/widgets/loc")
    public ResponseEntity<?> updateLocWidget(
            @RequestBody List<WidgetLocUpdateRequest> requests
    ) {
        widgetService.updateLoc(requests);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/widgets/{widgetId}")
    public ResponseEntity<?> updateWidget(
            @PathVariable(name = "widgetId") Long widgetId,
            @RequestBody WidgetUpdateRequest request
    ) {
        widgetService.updateWidget(request, widgetId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/widgets/{widgetId}")
    public ResponseEntity<?> deleteWidget(
            @PathVariable(name = "widgetId") Long widgetId
    ) {
        widgetService.deleteWidget(widgetId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/widgets/{projectId}")
    public ResponseEntity<?> deleteAllWidget(
            @PathVariable(name = "projectId") Long projectId
    ) {
        widgetService.deleteAllWidget(projectId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/widgets/small/{projectId}/{widgetType}")
    public ResponseEntity<?> getSmallWidget(
            HttpServletRequest request,
            @LoginUser User user,
            @PathVariable("projectId") Long projectId,
            @PathVariable("widgetType") String widgetType,
            @RequestParam(required = false, name = "tokenCodeId") String tokenCodeId,
            @RequestParam(required = false, name = "branch") String branch
    ) {
        WidgetType type = WidgetType.valueOf(widgetType.toUpperCase());
        String accessToken = request.getHeader(HttpHeaders.AUTHORIZATION);
        switch (type) {
            case SSAFYGITLAB: {
                if (branch == null)
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
            default: {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }
        }
    }
}
