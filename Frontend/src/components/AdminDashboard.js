import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ name: '', author: '' });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
        const response = await axios.get('http://localhost:8080/admin/books');
        console.log(response.data); // Log the response data
        setBooks(response.data);
    } catch (error) {
        console.error("Error fetching books:", error);
        alert(`Error fetching books: ${error.message}`);
    }
};



  const addBook = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8080/admin/addBooks', newBook);
    setNewBook({ name: '', author: '' });
    fetchBooks();
  };

  const removeBook = async (id) => {
    await axios.delete(`http://localhost:8080/admin/books/${id}`);
    fetchBooks();
  };
  console.log(books);

  return (
    <div className="p-6">
      <h2 className="mb-4 text-2xl font-bold">Admin Dashboard</h2>
      <div className="mb-6">
        <h3 className="mb-2 text-xl">Add New Book</h3>
        <form onSubmit={addBook} className="flex space-x-2">
          <input
            type="text"
            placeholder="Book Name"
            value={newBook.name}
            onChange={(e) => setNewBook({ ...newBook, name: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Author"
            value={newBook.author}
            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <button type="submit" className="p-2 text-white bg-green-500 rounded hover:bg-green-600">
            Add Book
          </button>
        </form>
      </div>
      <div>
        <h3 className="mb-2 text-xl">Book List</h3>
        <ul>
          {books.map((book) => (
            <li key={book.id} className="flex items-center justify-between mb-2 p-2 bg-white rounded shadow">
              <span>{book.name} by {book.author}</span>
              <button
                onClick={() => removeBook(book.id)}
                className="p-1 text-white bg-red-500 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminDashboard;