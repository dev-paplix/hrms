package com.example.hrms.common;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

import org.springframework.stereotype.Repository;

@Repository
// UserRepository.java
public interface UserRepository extends JpaRepository<Users, Long> {
    Optional<Users> findByEmailAndPassword(String email, String password);
}

