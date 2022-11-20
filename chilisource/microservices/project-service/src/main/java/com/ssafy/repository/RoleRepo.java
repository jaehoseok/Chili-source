package com.ssafy.repository;

import com.ssafy.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepo extends JpaRepository<Role, String> {
}
