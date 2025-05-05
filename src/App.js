// src/App.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, addUser, deleteUser } from './features/userSlice';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const { users, loading } = useSelector(state => state.users);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAddUser = () => {
    if (name && email) {
      const newUser = {
        id: Date.now(),
        name,
        email
      };
      dispatch(addUser(newUser));
      setName('');
      setEmail('');
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <div className="container">
      <h1>Account Management</h1>
      <div className="form">
        <input type="text" placeholder="Name" value={name}
               onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" value={email}
               onChange={(e) => setEmail(e.target.value)} />
        <button onClick={handleAddUser}>Add User</button>
      </div>

      <h2>User Management</h2>
      {loading ? (
        <div className="spinner">Loading users...</div>
      ) : (
        <table>
          <thead>
            <tr><th>Name</th><th>Email</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td><td>{user.email}</td>
                <td>
                  <button className="delete" onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
