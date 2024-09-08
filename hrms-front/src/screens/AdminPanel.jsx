import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ username: '', email: '', password: '', role: '', emergencyContact: '', workingExp: '', gender: '' });
    const [editUser, setEditUser] = useState(null);
    const [message, setMessage] = useState('');

    const API_URL = 'http://localhost:8080/api/users/';
    const LOCK_ATTEMPTS = 3;

    // Inline CSS
    const styles = {
        container: {
            padding: '20px',
            maxWidth: '800px',
            margin: '0 auto'
        },
        form: {
            marginBottom: '30px',
            display: 'flex',
            flexDirection: 'column'
        },
        input: {
            padding: '10px',
            margin: '5px 0',
            border: '1px solid #ccc',
            borderRadius: '5px'
        },
        button: {
            margin: '10px 0',
            padding: '10px 15px',
            border: 'none',
            borderRadius: '5px',
            backgroundColor: '#007bff',
            color: 'white',
            cursor: 'pointer'
        },
        buttonHover: {
            backgroundColor: '#0056b3'
        },
        list: {
            listStyle: 'none',
            padding: '0'
        },
        listItem: {
            padding: '15px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            marginBottom: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        actions: {
            marginLeft: '10px'
        },
        message: {
            color: 'red',
            fontWeight: 'bold'
        }
    };

    // Fetch users on component mount
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(API_URL);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleCreateUser = async () => {
        try {
            await axios.post(API_URL, newUser);
            setMessage('User created successfully!');
            fetchUsers(); // Refresh the user list after creating a new user
            setNewUser({ username: '', email: '', password: '', role: '', emergencyContact: '', workingExp: '', gender: '' });
        } catch (error) {
            setMessage('Error creating user.');
            console.error('Error creating user:', error);
        }
    };

    const handleEditUser = (user) => {
        setEditUser(user);
    };

    const handleUpdateUser = async () => {
        try {
            await axios.put(`${API_URL}${editUser.id}`, editUser);
            setMessage('User updated successfully!');
            fetchUsers();
            setEditUser(null); // Clear edit form after update
        } catch (error) {
            setMessage('Error updating user.');
            console.error('Error updating user:', error);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await axios.delete(`${API_URL}${id}`);
            setMessage('User deleted successfully!');
            fetchUsers();
        } catch (error) {
            setMessage('Error deleting user.');
            console.error('Error deleting user:', error);
        }
    };

    const handleLockAccount = async (id) => {
        try {
            await axios.patch(`${API_URL}${id}/lock`);
            setMessage('User account locked.');
            fetchUsers();
        } catch (error) {
            setMessage('Error locking user account.');
            console.error('Error locking user account:', error);
        }
    };

    const handleUnlockAccount = async (id) => {
        try {
            await axios.patch(`${API_URL}${id}/unlock`);
            setMessage('User account unlocked.');
            fetchUsers();
        } catch (error) {
            setMessage('Error unlocking user account.');
            console.error('Error unlocking user account:', error);
        }
    };

    // Event handlers for button hover, focus, and blur states
    const handleMouseOver = (e) => {
        e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor;
    };

    const handleMouseOut = (e) => {
        e.currentTarget.style.backgroundColor = styles.button.backgroundColor;
    };

    const handleFocus = (e) => {
        e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor;
    };

    const handleBlur = (e) => {
        e.currentTarget.style.backgroundColor = styles.button.backgroundColor;
    };

    return (
        <div style={styles.container}>
            <h1>Admin Panel</h1>
            {message && <div style={styles.message}>{message}</div>}

            {/* Form for creating a new user */}
            <div>
                <h2>Create User</h2>
                <div style={styles.form}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={newUser.username}
                        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                        style={styles.input}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        style={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        style={styles.input}
                    />
                    <input
                        type="text"
                        placeholder="Role"
                        value={newUser.role}
                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                        style={styles.input}
                    />
                    <input
                        type="text"
                        placeholder="Emergency Contact"
                        value={newUser.emergencyContact}
                        onChange={(e) => setNewUser({ ...newUser, emergencyContact: e.target.value })}
                        style={styles.input}
                    />
                    <input
                        type="text"
                        placeholder="Working Experience"
                        value={newUser.workingExp}
                        onChange={(e) => setNewUser({ ...newUser, workingExp: e.target.value })}
                        style={styles.input}
                    />
                    <input
                        type="text"
                        placeholder="Gender"
                        value={newUser.gender}
                        onChange={(e) => setNewUser({ ...newUser, gender: e.target.value })}
                        style={styles.input}
                    />
                    <button
                        type="button"
                        onClick={handleCreateUser}
                        style={styles.button}
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    >
                        Create User
                    </button>
                </div>
            </div>

            {/* List of users */}
            <h2>All Users</h2>
            <ul style={styles.list}>
                {users.map((user) => (
                    <li key={user.id} style={styles.listItem}>
                        {user.username} - {user.email} - {user.role}
                        <div style={styles.actions}>
                            <button
                                type="button"
                                onClick={() => handleEditUser(user)}
                                style={styles.button}
                            >
                                Edit
                            </button>
                            <button
                                type="button"
                                onClick={() => handleDeleteUser(user.id)}
                                style={styles.button}
                            >
                                Delete
                            </button>
                            {user.failedAttempts >= LOCK_ATTEMPTS ? (
                                <button
                                    type="button"
                                    onClick={() => handleUnlockAccount(user.id)}
                                    style={styles.button}
                                >
                                    Unlock
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => handleLockAccount(user.id)}
                                    style={styles.button}
                                >
                                    Lock
                                </button>
                            )}
                        </div>
                    </li>
                ))}
            </ul>

            {/* Form for editing a user */}
            {editUser && (
                <div>
                    <h2>Edit User</h2>
                    <div style={styles.form}>
                        <input
                            type="text"
                            placeholder="Username"
                            value={editUser.username}
                            onChange={(e) => setEditUser({ ...editUser, username: e.target.value })}
                            style={styles.input}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={editUser.email}
                            onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                            style={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="Role"
                            value={editUser.role}
                            onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
                            style={styles.input}
                        />
                        <button
                            type="button"
                            onClick={handleUpdateUser}
                            style={styles.button}
                            onMouseOver={handleMouseOver}
                            onMouseOut={handleMouseOut}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        >
                            Update User
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
