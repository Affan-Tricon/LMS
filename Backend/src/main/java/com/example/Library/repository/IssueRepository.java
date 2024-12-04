package com.example.Library.repository;

import com.example.Library.model.Issue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface IssueRepository extends JpaRepository<Issue, Long> {
    Optional<Issue> findById(Long issueId);

    Issue save(Issue issue);

    void delete(Issue issue);

    List<Issue> findByStatus(String status);

    List<Issue> findByUserId(Long userId);
}
