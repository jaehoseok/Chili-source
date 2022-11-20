package com.ssafy.service;

import com.ssafy.dto.request.RoleCreateRequest;
import com.ssafy.dto.request.RoleUpdateRequest;
import com.ssafy.dto.response.RoleResponse;
import com.ssafy.entity.Role;
import com.ssafy.exception.NotFoundException;
import com.ssafy.repository.RoleRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.exception.NotFoundException.ROLE_NOT_FOUND;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
@Slf4j
public class RoleServiceImpl implements RoleService {
    private final RoleRepo roleRepo;

    // 권한 목록 조회
    @Override
    public List<RoleResponse> getRoleList() {
        return roleRepo.findAll().stream()
                .map(role -> RoleResponse.builder()
                        .id(role.getId())
                        .remove(role.getRemove())
                        .modify(role.getModify())
                        .invite(role.getInvite())
                        .fire(role.getFire())
                        .build()
                ).collect(Collectors.toList());
    }

    // 권한 하나 조회
    @Override
    public RoleResponse getRole(String roleId) {
        Role role = roleRepo.findById(roleId)
                .orElseThrow(() -> new NotFoundException(ROLE_NOT_FOUND));

        return RoleResponse.builder()
                .id(role.getId())
                .remove(role.getRemove())
                .modify(role.getModify())
                .invite(role.getInvite())
                .fire(role.getFire())
                .build();
    }

    // 권한 추가
    @Override
    @Transactional
    public void createRole(RoleCreateRequest request) {
        Role role = Role.builder()
                .id(request.getId())
                .remove(request.getRemove())
                .modify(request.getModify())
                .invite(request.getInvite())
                .fire(request.getFire())
                .build();

        roleRepo.save(role);
    }

    // 권한 수정
    @Override
    @Transactional
    public void updateRole(RoleUpdateRequest request) {
        Role role = roleRepo.findById(request.getId())
                .orElseThrow(() -> new NotFoundException(ROLE_NOT_FOUND));

        role.update(request.getModify(), request.getInvite(), request.getFire(), request.getRemove());
    }

    // 권한 삭제
    @Override
    @Transactional
    public void deleteRole(String roleId) {
        Role role = roleRepo.findById(roleId)
                .orElseThrow(() -> new NotFoundException(ROLE_NOT_FOUND));

        roleRepo.delete(role);
    }
}
