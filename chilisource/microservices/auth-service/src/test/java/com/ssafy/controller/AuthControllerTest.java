package com.ssafy.controller;

import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
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
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.redirectedUrl;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureRestDocs// rest docs 자동 설정
@AutoConfigureMockMvc
@RunWith(SpringRunner.class)
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("구글 로그인")
    public void socialLoginRedirect() throws Exception{
        mockMvc.perform (
                        get("/login/{socialLoginType}", "GOOGLE")
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(redirectedUrl("https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile&response_type=code&redirect_uri=http://localhost:8000/api/auth-service/login/google/callback&client_id=772414000810-4sp08rireoj3p28fvpklud1cf142vcbg.apps.googleusercontent.com"))
                .andDo(
                        document("GOOGLE LOGIN")
                )
        ;
    }

    @Test
    public void callback() throws Exception {
        LinkedMultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("code", "test");
        mockMvc.perform (
                        get("/login/{socialLoginType}/callback", "GOOGLE")
                                .contentType(MediaType.APPLICATION_JSON)
                                .param("code", "4%2F0ARtbsJp4ZzYuo7_ndRDYT7RjQbuNH_1N5T4woIdg5mwT6CcicerK0N9zXdSNFU_TRQZKIg")
                )
                //.andExpect(status().isOk())
                .andDo( // rest docs 문서 작성 시작
                        document("GOOGLE LOGIN CALLBACK",//, // 문서 조각 디렉토리 명
                                pathParameters( // path 파라미터 정보 입력
                                        parameterWithName("code").description("GOOGLE CODE")
                                ),
                                responseFields( // response 필드 정보 입력
                                        fieldWithPath("accessToken").description("ACCESS TOKEN")
                                )
                        )
                )
        ;
    }

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
        mockMvc.perform (
                        get("/auth-service/token-codes")
                                .contentType(MediaType.APPLICATION_JSON)
                )
                //.andExpect(status().isOk())
                .andDo( // rest docs 문서 작성 시작
                        document("GET user-token-codes"//, // 문서 조각 디렉토리 명
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