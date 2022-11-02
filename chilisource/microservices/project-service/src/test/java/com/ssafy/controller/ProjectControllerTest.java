package com.ssafy.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.dto.request.ProjectCreateRequest;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.util.StopWatch;

import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureRestDocs// rest docs 자동 설정
@AutoConfigureMockMvc
@RunWith(SpringRunner.class)
class ProjectControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    private static StopWatch stopWatch;

    @BeforeEach
    void setData() {
        stopWatch = new StopWatch("API Controller Tests");
        stopWatch.start();
    }

    @AfterEach
    void stop() {
        stopWatch.stop();
        System.out.println("===================================================");
        System.out.println("개별 테스트 성능 측정 결과");
        System.out.println("===================================================");
        System.out.println("Time Seconds = " + stopWatch.getTotalTimeSeconds() + "s");
        System.out.println("Time Millis = " + stopWatch.getTotalTimeMillis() + "ms");
        System.out.println("Time Nanos = " + stopWatch.getTotalTimeNanos() + "ns");
        //System.out.println(stopWatch.shortSummary());
        System.out.println(stopWatch.prettyPrint());
        System.out.println("===================================================");
    }

    @Test
    void getProject() throws Exception {
        System.out.println("get project test");
        mockMvc.perform(
                        get("/{projectId}", 2L)
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isOk())
                .andDo(
                        document("project-get")
                );
    }

    @Test
    void getProjectByUserId() throws Exception {
    }

    @Test
    void createProject() throws Exception {
        System.out.println("create project test");

        ProjectCreateRequest request = ProjectCreateRequest.builder()
                .name("프로젝트 1")
                .description("프로젝트 설명")
                .image("이미지 경로")
                .build();
        String content = objectMapper.writeValueAsString(request);

        mockMvc.perform(
                        post("/")
                                .content(content)
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isOk())
                .andDo(
                        document("project-post")
                );
    }

    @Test
    void updateProject() throws Exception {
    }

    @Test
    void deleteProject() throws Exception {
    }

    @Test
    void updateProjectToken() throws Exception {
    }

    @Test
    void deleteProjectToken() throws Exception {
    }
}