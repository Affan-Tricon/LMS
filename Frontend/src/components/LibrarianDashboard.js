import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LibrarianDashboard() {
  const [requests, setRequests] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const response = await axios.get('http://localhost:8080/librarian/requests');
    setRequests(response.data);
  };

  const registerUser = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8080/librarian/register', newUser);
    setNewUser({ name: '', email: '', password: '' });
    alert('User registered successfully');
  };

  const approveRequest = async (issueId) => {
    await axios.post(`http://localhost:8080/librarian/approve/${issueId}`);
    fetchRequests();
  };

  const rejectRequest = async (issueId) => {
    await axios.post(`http://localhost:8080/librarian/reject/${issueId}`);
    fetchRequests();
  };

  return (
    <div className="p-6">
      <h2 className="mb-4 text-2xl font-bold">Librarian Dashboard</h2>
      <div className="mb-6">
        <h3 className="mb-2 text-xl">Register New User</h3>
        <form onSubmit={registerUser} className="flex space-x-2">
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <button type="submit" className="p-2 text-white bg-green-500 rounded hover:bg-green-600">
            Register User
          </button>
        </form>
      </div>
      <div>
        <h3 className="mb-2 text-xl">Book Issue Requests</h3>
        <ul>
          {requests.map((request) => (
            <li key={request.id} className="flex items-center justify-between mb-2 p-2 bg-white rounded shadow">
              <span>{request.user.name} requested {request.book.name}</span>
              <div>
                <button
                  onClick={() => approveRequest(request.id)}
                  className="p-1 mr-2 text-white bg-green-500 rounded hover:bg-green-600"
                >
                  Approve
                </button>
                <button
                  onClick={() => rejectRequest(request.id)}
                  className="p-1 text-white bg-red-500 rounded hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default LibrarianDashboard;