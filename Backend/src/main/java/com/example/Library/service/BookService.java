package com.example.Library.service;

import com.example.Library.model.Book;
import com.example.Library.repository.BookRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    public Book addBook(Book book) {
        book.setStatus("available");
        return bookRepository.save(book);
    }

    @Transactional
    public void removeBook(Long id) {
        bookRepository.deleteById(id);
    }

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public Book findBookByName(String name) {
        Optional<Book> bookN = bookRepository.findByName(name);
        System.out.println(bookN);
        return bookN
                .orElseThrow(() -> new RuntimeException("Book not found"));
    }

    public void updateBookStatus(Long bookId, String status) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found"));
        book.setStatus(status);
        bookRepository.save(book);
    }
}
