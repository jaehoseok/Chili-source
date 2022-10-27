package com.ssafy.controller;

import com.ssafy.service.WiggetService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class WiggetController {
    private final WiggetService userService;
}
