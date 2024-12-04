// import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import axios from 'axios';

// function Login() {
//   const [role, setRole] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const history = useHistory();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (role === 'admin') {
//       if (email === 'admin@library.com' && password === 'adminpass') {
//         history.push('/admin');
//       } else {
//         alert('Invalid admin credentials');
//       }
//     } else if (role === 'librarian') {
//       if (email === 'librarian@library.com' && password === 'librarianpass') {
//         history.push('/librarian');
//       } else {
//         alert('Invalid librarian credentials');
//       }
//     } else if (role === 'user') {
//       try {
//         const response = await axios.post('/api/login', { email, password });
//         if (response.data === 'Login successful') {
//           history.push('/user');
//         }
//       } catch (error) {
//         alert('Invalid user credentials');
//       }
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <div className="p-6 bg-white rounded shadow-md">
//         <h2 className="mb-4 text-2xl font-bold">Login</h2>
//         <form onSubmit={handleLogin}>
//           <div className="mb-4">
//             <label className="block mb-2">Role:</label>
//             <select
//               className="w-full p-2 border rounded"
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               required
//             >
//               <option value="">Select a role</option>
//               <option value="admin">Admin</option>
//               <option value="librarian">Librarian</option>
//               <option value="user">User</option>
//             </select>
//           </div>
//           <div className="mb-4">
//             <label className="block mb-2">Email:</label>
//             <input
//               type="email"
//               className="w-full p-2 border rounded"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block mb-2">Password:</label>
//             <input
//               type="password"
//               className="w-full p-2 border rounded"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit" className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600">
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEmail } from './EmailContext';

function Login() {
  const [role, setRole] = useState('');
  const {email ,setEmail } = useEmail();
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (role === 'admin') {
      if (email === 'admin@gmail.com' && password === 'adminpass') {
        navigate('/admin');
      } else {
        alert('Invalid admin credentials');
      }
    } else if (role === 'librarian') {
      if (email === 'librarian@gmail.com' && password === 'librarianpass') {
        navigate('/librarian');
      } else {
        alert('Invalid librarian credentials');
      }
    } else if (role === 'user') {
      try {
        const response = await axios.post(`http://localhost:8080/api/login?email=${email}&password=${password}`);
        if (response) {
          navigate('/user', { state: { email } });
        }
      } catch (error) {
        alert('Invalid user credentials');
      }
    }
  };
  console.log(email);
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-6 bg-white rounded shadow-md">
        <h2 className="mb-4 text-2xl font-bold">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-2">Role:</label>
            <select
              className="w-full p-2 border rounded"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select a role</option>
              <option value="admin">Admin</option>
              <option value="librarian">Librarian</option>
              <option value="user">User</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Email:</label>
            <input
              type="email"
              className="w-full p-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Password:</label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;