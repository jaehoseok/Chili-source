package com.ssafy.repository;

import com.ssafy.entity.UserProject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserProjectRepo extends JpaRepository<UserProject, Long>, UserProjectCustomRepo {
}
