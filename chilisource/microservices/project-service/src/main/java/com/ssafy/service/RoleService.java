package com.ssafy.service;

import com.ssafy.dto.request.RoleCreateRequest;
import com.ssafy.dto.request.RoleUpdateRequest;
import com.ssafy.dto.response.RoleResponse;

import java.util.List;

public interface RoleService {
    // 권한 전체 조회
    List<RoleResponse> getRoleList();

    // 권한 하나 조회
    RoleResponse getRole(String roleId);

    // 권한 추가
    void createRole(RoleCreateRequest request);

    // 권한 수정
    void updateRole(RoleUpdateRequest request);

    // 권한 삭제
    void deleteRole(String roleId);
}
