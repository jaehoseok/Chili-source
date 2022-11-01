package com.ssafy.controller;

import org.junit.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureRestDocs// rest docs 자동 설정
@AutoConfigureMockMvc
@RunWith(SpringRunner.class)
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

//    @Test
//    public void socialLoginRedirect() throws Exception{
//    }
//
//    @Test
//    public void callback() throws Exception {
//    }

//    @Test
//    public void refresh() {
//        mockMvc.perform (
//                        get("/auth-service/token-codes")
//                                .contentType(MediaType.APPLICATION_JSON)
//                )
//                .andExpect(status().isOk())
//    }

    @Test
    public void getTokenCodeList() throws Exception{
        System.out.println(mockMvc);
        mockMvc.perform (
                        get("/auth-service/token-codes")
                                .contentType(MediaType.APPLICATION_JSON)
                )
                //.andExpect(status().isOk())
                .andDo( // rest docs 문서 작성 시작
                        document("user-get"//, // 문서 조각 디렉토리 명
//                                pathParameters( // path 파라미터 정보 입력
//                                        parameterWithName("id").description("Member ID")
//                                ),
//                                responseFields( // response 필드 정보 입력
//                                        fieldWithPath("id").description("ID"),
//                                        fieldWithPath("name").description("name"),
//                                        fieldWithPath("email").description("email")
//                                )
                        )
                )
        ;
    }

//    @Test
//    public void createTokenCode() {
//    }
//
//    @Test
//    public void updateTokenCode() {
//    }
//
//    @Test
//    public void deleteTokenCode() {
//    }
//
//    @Test
//    public void getTokenList() {
//    }
//
//    @Test
//    public void getToken() {
//    }
//
//    @Test
//    public void createToken() {
//    }
//
//    @Test
//    public void deleteToken() {
//    }
}