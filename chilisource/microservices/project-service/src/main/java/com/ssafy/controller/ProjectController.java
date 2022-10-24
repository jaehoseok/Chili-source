package com.ssafy.controller;

import com.ssafy.config.loginuser.LoginUser;
import com.ssafy.config.loginuser.User;
import com.ssafy.entity.Project;
import com.ssafy.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RestController
public class ProjectController {
    private final ProjectService projectService;

    @GetMapping
    public ResponseEntity<?> getProject(@LoginUser User user) {
        List<Project> list = new ArrayList<>();
        return new ResponseEntity<List<Project>>(list, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> createProject() {
        return new ResponseEntity<String>("", HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<?> updateProject() {
        return new ResponseEntity<String>("", HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteProject() {
        return new ResponseEntity<String>("", HttpStatus.OK);
    }
}
