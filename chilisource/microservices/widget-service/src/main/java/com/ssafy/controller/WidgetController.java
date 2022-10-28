package com.ssafy.controller;

import com.ssafy.dto.request.WidgetCodeCreateRequest;
import com.ssafy.dto.request.WidgetCodeUpdateRequest;
import com.ssafy.dto.request.WidgetCreateRequest;
import com.ssafy.dto.request.WidgetUpdateRequest;
import com.ssafy.service.WidgetCodeService;
import com.ssafy.service.WidgetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.Path;

@RestController
@RequiredArgsConstructor
public class WidgetController {
    private final WidgetService widgetService;
    private final WidgetCodeService widgetCodeService;

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
    ){
        widgetService.deleteWidget(widgetId);
        return ResponseEntity.ok().build();
    }
}
