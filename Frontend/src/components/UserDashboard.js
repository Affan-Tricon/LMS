import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useEmail } from './EmailContext';

function UserDashboard() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [userIssues, setUserIssues] = useState([]); // Ensure this is an array
  const [userId, setUserId] = useState(null); // Add state for userId

  const {email} = useEmail();
  console.log(email);
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get("http://localhost:8080/user/id", {
          params: { email}
        });
        setUserId(response.data);
        fetchBooks();
        fetchUserIssues(response.data);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };
    
    fetchUserId();
  }, [email]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/user/books');
      if (Array.isArray(response.data)) {
        setBooks(response.data);
      } else {
        console.error("Unexpected response format:", response.data);
        setBooks([]);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const fetchUserIssues = async (userId) => {
    if (!userId) {
      console.error("Invalid userId:", userId);
      return;
    }
    
    console.log("Fetching user issues for userId:", userId);
    
    try {
      const response = await axios.get(`http://localhost:8080/user/issues?userId=${userId}`);
      console.log("User issues response:", response.data);
      
      if (Array.isArray(response.data)) {
        setUserIssues(response.data);
      } else {
        console.error("Unexpected response format:", response.data);
        setUserIssues([]);
      }
    } catch (error) {
      console.error("Error fetching user issues:", error.message);
      alert('Failed to fetch user issues. Please try again.');
    }
  };
  
  const searchBook = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/user/search?name=${searchTerm}`);
      if (Array.isArray(response.data)) {
        setBooks(response.data);
      } else {
        setBooks([response.data]);
      }
    } catch (error) {
      console.error("Error searching for books:", error);
    }
  };

  // const requestBook = async (bookId) => {
  //   const date = new Date().toISOString().split('T')[0];
  //   try {
  //     await axios.post(`http://localhost:8080/user/request/${userId}/${bookId}/${date}`);
  //     alert('Book request submitted successfully');
  //     console.log(userId);
  //     fetchBooks();
  //   } catch (error) {
  //     console.error("Error requesting book:", error);
  //     alert('Failed to request book. Please try again.');
  //   }
  // };



  const requestBook = async (bookId) => {
    if (!userId) {
        alert('User ID is not available. Please log in again.');
        return;
    }

    const date = new Date().toISOString().split('T')[0];
    try {
        await axios.post(`http://localhost:8080/user/request`, null, {
            params: { userId, bookId, date }
        });
        alert('Book request submitted successfully');
        fetchBooks();
    } catch (error) {
        console.error("Error requesting book:", error);
        alert('Failed to request book. Please try again.');
    }
};

  const returnBook = async (issueId) => {
    try {
      await axios.post(`http://localhost:8080/user/return/${issueId}`);
      fetchUserIssues(userId);
    } catch (error) {
      console.error("Error returning book:", error);
      alert('Failed to return book. Please try again.');
    }
  };

  return (
    <div className="p-6">
      <h2 className="mb-4 text-2xl font-bold">User Dashboard</h2>
      <div className="mb-6">
        <h3 className="mb-2 text-xl">Search Books</h3>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Book Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded"
          />
          <button onClick={searchBook} className="p-2 text-white bg-blue-500 rounded hover:bg-blue-600">
            Search
          </button>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="mb-2 text-xl">Available Books</h3>
        <ul>
          {books.map((book) => (
            <li key={book.id} className="flex items-center justify-between mb-2 p-2 bg-white rounded shadow">
              <span>{book.name} by {book.author}</span>
              <button
                onClick={() => requestBook(book.id)}
                className="p-1 text-white bg-green-500 rounded hover:bg-green-600"
              >
                Request
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="mb-2 text-xl">My Issues</h3>
        <ul>
          {Array.isArray(userIssues) && userIssues.map((issue) => ( // Check if userIssues is an array
            <li key={issue.id} className="flex items-center justify-between mb-2 p-2 bg-white rounded shadow">
              <span>{issue.book.name} (Issue Date: {issue.issueDate})</span>
              <button
                onClick={() => returnBook(issue.id)}
                className="p-1 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Return
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UserDashboard;
