package com.example.Library.controller;

import com.example.Library.model.Book;
import com.example.Library.model.Issue;
import com.example.Library.service.BookService;
import com.example.Library.service.IssueService;
import com.example.Library.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin (origins = "http://localhost:3000")
@RequestMapping("/user")
public class UserController {
    @Autowired
    private BookService bookService;

    @Autowired
    private IssueService issueService;

    @Autowired
    private UserService userService;

    @GetMapping("/search")
    public ResponseEntity<?> searchBook(@RequestParam String name) {
        Book book = bookService.findBookByName(name);

        if (book == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Book not found with the name: " + name);
        }

        return ResponseEntity.ok(book);
    }

    @GetMapping("/books")
    public ResponseEntity<List<Book>> getAllBooks() {
        List<Book> books = bookService.getAllBooks();
        if (books.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build(); // No books found
        }
        return ResponseEntity.ok(books);
    }

    @GetMapping("/issues")
    public ResponseEntity<List<Issue>> getUserIssues(@RequestParam Long userId) {
        List<Issue> userIssues = issueService.getIssuesByUserId(userId);
        if (userIssues.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build(); // No issues found
        }
        return ResponseEntity.ok(userIssues);
    }

    @GetMapping("/id")
    public ResponseEntity<?> getUserId(@RequestParam String email) {
        Long userId = userService.findByEmail(email);

        if (userId == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("User not found with the email: " + email);
        }

        return ResponseEntity.ok(userId);
    }

    @PostMapping("/return/{issueId}")
    public ResponseEntity<Void> returnBook(@PathVariable Long issueId) {
        issueService.returnBook(issueId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/request")
    public ResponseEntity<Issue> requestBook(
            @RequestParam Long userId,
            @RequestParam Long bookId,
            @RequestParam String date
    ) {
        return ResponseEntity.ok(issueService.requestBook(userId, bookId, date));

    }
}
