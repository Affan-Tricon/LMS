package com.example.Library.repository;


import com.example.Library.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;


public interface BookRepository extends JpaRepository<Book, Integer> {

    Optional<Book> findById(Long bookId);

    Optional<Book> findByName(String name);

    Optional<Book> deleteById(Long id);

    Book save(Book book);
}
