package com.example.Library.controller;

import com.example.Library.model.Issue;
import com.example.Library.model.User;
import com.example.Library.service.IssueService;
import com.example.Library.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin (origins = "http://localhost:3000")
@RequestMapping("/librarian")
public class LibrarianController {
    @Autowired
    private UserService userService;

    @Autowired
    private IssueService issueService;

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.registerUser(user));
    }

    @GetMapping("/requests")
    public ResponseEntity<List<Issue>> getLibrarianRequests() {
        List<Issue> requests = issueService.getAllRequests();
        return ResponseEntity.ok(requests);
    }

    @PostMapping("/approve/{issueId}")
    public ResponseEntity<Issue> approveRequest(@PathVariable Long issueId) {
        Issue approvedIssue = issueService.approveRequest(issueId);
        return ResponseEntity.ok(approvedIssue);
    }

    @PostMapping("/reject/{issueId}")
    public ResponseEntity<Void> rejectRequest(@PathVariable Long issueId) {
        issueService.rejectRequest(issueId);
        return ResponseEntity.ok().build();
    }
}
