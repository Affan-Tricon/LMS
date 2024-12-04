package com.example.Library.service;

import com.example.Library.model.Book;
import com.example.Library.model.Issue;
import com.example.Library.model.User;
import com.example.Library.repository.BookRepository;
import com.example.Library.repository.IssueRepository;
import com.example.Library.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class IssueService {
    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private UserRepository userRepository;

    public Issue issueBook(Long userId, Long bookId, String date) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        if (!book.getStatus().equals("available")) {
            throw new RuntimeException("Book is already issued for someone else");
        }

        Issue issue = new Issue();
        issue.setUser(user);
        issue.setBook(book);
        issue.setIssueDate(date);
        book.setStatus("issued");
        bookRepository.save(book);
        return issueRepository.save(issue);
    }

    public void returnBook(Long issueId) {
        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new RuntimeException("Issue record not found"));
        Book book = issue.getBook();

        book.setStatus("available");
        bookRepository.save(book);
        issueRepository.delete(issue);
    }

    public Issue approveRequest(Long issueId) {
        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new RuntimeException("Issue request not found"));

        if (!issue.getStatus().equals("pending")) {
            throw new RuntimeException("Only pending requests can be approved");
        }

        Book book = issue.getBook();
        if (!book.getStatus().equals("available")) {
            throw new RuntimeException("Book is not available for issue");
        }

        issue.setStatus("approved");
        book.setStatus("issued");
        bookRepository.save(book);

        return issueRepository.save(issue);
    }

    @Transactional
    public void rejectRequest(Long issueId) {
        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new RuntimeException("Issue request not found"));

        if (!issue.getStatus().equals("pending")) {
            throw new RuntimeException("Only pending requests can be rejected");
        }

        issue.setStatus("rejected");
        issueRepository.save(issue);
        issueRepository.delete(issue);
    }

    public Issue requestBook(Long userId, Long bookId, String date) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        Issue issue = new Issue();
        issue.setUser(user);
        issue.setBook(book);
        issue.setIssueDate(date);
        issue.setStatus("pending");

        return issueRepository.save(issue);
    }

    public List<Issue> getAllRequests() {
        return issueRepository.findByStatus("pending");
    }

    public List<Issue> getIssuesByUserId(Long userId) {
        return issueRepository.findByUserId(userId);
    }
}