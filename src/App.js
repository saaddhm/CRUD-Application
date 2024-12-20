import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({ name: '', email: '', age: '' });
    const [editingUser, setEditingUser] = useState(null);

    const API_URL = 'http://localhost:3001/users';

    // Fetch users
    const fetchUsers = async () => {
        const response = await axios.get(API_URL);
        setUsers(response.data);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingUser) {
            await axios.put(`${API_URL}/${editingUser.id}`, formData);
        } else {
            await axios.post(API_URL, formData);
        }
        setFormData({ name: '', email: '', age: '' });
        setEditingUser(null);
        fetchUsers();
    };

    // Handle delete
    const handleDelete = async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        fetchUsers();
    };

    // Handle edit
    const handleEdit = (user) => {
        setFormData(user);
        setEditingUser(user);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>CRUD Application</h1>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="Age"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    required
                />
                <button type="submit">{editingUser ? 'Update' : 'Add'}</button>
            </form>

            {/* Users Table */}
            <table border="1" width="100%">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.age}</td>
                            <td>
                                <button onClick={() => handleEdit(user)}>Edit</button>
                                <button onClick={() => handleDelete(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default App;
