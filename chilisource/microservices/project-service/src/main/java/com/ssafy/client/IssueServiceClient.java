package com.ssafy.client;

import feign.Response;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.List;

@FeignClient(name = "issue-service", url = "https://k7b2071.p.ssafy.io/issue-service")
public interface IssueServiceClient {
    @DeleteMapping("/all/{projectId}")
    Response deleteAll(@RequestHeader(HttpHeaders.AUTHORIZATION) List<String> auths,
                       @PathVariable("projectId") Long projectId);
}
