import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaPlusCircle } from 'react-icons/fa';

// Define the number of allowed lock attempts before a user is locked out
const LOCK_ATTEMPTS = 3;

const AdminPanel = () => {
    const [employees, setEmployees] = useState([]);
    const [newEmployee, setNewEmployee] = useState({
        username: '', email: '', password: '', role: '', emergencyContact: '', workingExp: '', gender: ''
    });
    const [editEmployee, setEditEmployee] = useState(null);
    const [message, setMessage] = useState('');
    const [failedAttempts, setFailedAttempts] = useState(0); // Track failed attempts

    const API_URL = 'http://localhost:8080/api/employees/';

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
        },
        actionButton: {
            padding: '10px 15px',
            border: 'none',
            borderRadius: '5px',
            backgroundColor: '#28a745',
            color: 'white',
            cursor: 'pointer'
        },
        actionButtonHover: {
            backgroundColor: '#218838'
        }
    };

    // Fetch employees on component mount
    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get(API_URL);
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const handleCreateEmployee = async () => {
        if (failedAttempts >= LOCK_ATTEMPTS) {
            setMessage('Too many failed attempts. Please try again later.');
            return;
        }
        try {
            await axios.post(API_URL, newEmployee);
            setMessage('Employee created successfully!');
            fetchEmployees();
            handleClearForm();  // Clear the form after creation
            setFailedAttempts(0); // Reset failed attempts after success
        } catch (error) {
            setMessage('Error creating employee.');
            setFailedAttempts(prev => prev + 1); // Increment failed attempts on error
            console.error('Error creating employee:', error);
        }
    };

    const handleEditEmployee = (emp) => {
        setEditEmployee(emp);
    };

    const handleUpdateEmployee = async () => {
        if (failedAttempts >= LOCK_ATTEMPTS) {
            setMessage('Too many failed attempts. Please try again later.');
            return;
        }
        try {
            await axios.put(`${API_URL}${editEmployee.id}`, editEmployee);
            setMessage('Employee updated successfully!');
            fetchEmployees();
            setEditEmployee(null);
            setFailedAttempts(0); // Reset failed attempts after success
        } catch (error) {
            setMessage('Error updating employee.');
            setFailedAttempts(prev => prev + 1); // Increment failed attempts on error
            console.error('Error updating employee:', error);
        }
    };

    const handleDeleteEmployee = async (id) => {
        if (failedAttempts >= LOCK_ATTEMPTS) {
            setMessage('Too many failed attempts. Please try again later.');
            return;
        }
        try {
            await axios.delete(`${API_URL}${id}`);
            setMessage('Employee deleted successfully!');
            fetchEmployees();
            setFailedAttempts(0); // Reset failed attempts after success
        } catch (error) {
            setMessage('Error deleting employee.');
            setFailedAttempts(prev => prev + 1); // Increment failed attempts on error
            console.error('Error deleting employee:', error);
        }
    };

    const handleClearForm = () => {
        setNewEmployee({
            username: '', email: '', password: '', role: '', emergencyContact: '', workingExp: '', gender: ''
        });
    };

    const handleMouseOver = (e, style) => {
        e.currentTarget.style.backgroundColor = style.backgroundColor;
    };

    const handleMouseOut = (e, style) => {
        e.currentTarget.style.backgroundColor = style.backgroundColor;
    };

    return (
        <div style={styles.container}>
            <h1>Admin Panel</h1>
            {message && <div style={styles.message}>{message}</div>}

            {/* Form for creating a new employee */}
            <div>
                <h2>Create Employee</h2>
                <div style={styles.form}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={newEmployee.username}
                        onChange={(e) => setNewEmployee({ ...newEmployee, username: e.target.value })}
                        style={styles.input}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={newEmployee.email}
                        onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                        style={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={newEmployee.password}
                        onChange={(e) => setNewEmployee({ ...newEmployee, password: e.target.value })}
                        style={styles.input}
                    />
                    <input
                        type="text"
                        placeholder="Role"
                        value={newEmployee.role}
                        onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
                        style={styles.input}
                    />
                    <input
                        type="text"
                        placeholder="Emergency Contact"
                        value={newEmployee.emergencyContact}
                        onChange={(e) => setNewEmployee({ ...newEmployee, emergencyContact: e.target.value })}
                        style={styles.input}
                    />
                    <input
                        type="text"
                        placeholder="Working Experience"
                        value={newEmployee.workingExp}
                        onChange={(e) => setNewEmployee({ ...newEmployee, workingExp: e.target.value })}
                        style={styles.input}
                    />
                    <input
                        type="text"
                        placeholder="Gender"
                        value={newEmployee.gender}
                        onChange={(e) => setNewEmployee({ ...newEmployee, gender: e.target.value })}
                        style={styles.input}
                    />
                    <button
                        type="button"
                        onClick={handleCreateEmployee}
                        style={styles.button}
                        onMouseOver={(e) => handleMouseOver(e, styles.buttonHover)}
                        onMouseOut={(e) => handleMouseOut(e, styles.button)}
                        onFocus={(e) => handleMouseOver(e, styles.buttonHover)}
                        onBlur={(e) => handleMouseOut(e, styles.button)}
                    >
                        <FaPlusCircle /> Create Employee
                    </button>
                </div>
            </div>

            {/* List of employees */}
            <h2>All Employees</h2>
            <ul style={styles.list}>
                {employees.map((emp) => (
                    <li key={emp.id} style={styles.listItem}>
                        {emp.username} - {emp.email} - {emp.role}
                        <div style={styles.actions}>
                            <button
                                type="button"
                                onClick={() => handleEditEmployee(emp)}
                                style={styles.actionButton}
                                onMouseOver={(e) => handleMouseOver(e, styles.actionButtonHover)}
                                onMouseOut={(e) => handleMouseOut(e, styles.actionButton)}
                                onFocus={(e) => handleMouseOver(e, styles.actionButtonHover)}
                                onBlur={(e) => handleMouseOut(e, styles.actionButton)}
                            >
                                <FaEdit /> Edit
                            </button>
                            <button
                                type="button"
                                onClick={() => handleDeleteEmployee(emp.id)}
                                style={styles.actionButton}
                                onMouseOver={(e) => handleMouseOver(e, styles.actionButtonHover)}
                                onMouseOut={(e) => handleMouseOut(e, styles.actionButton)}
                                onFocus={(e) => handleMouseOver(e, styles.actionButtonHover)}
                                onBlur={(e) => handleMouseOut(e, styles.actionButton)}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Form for editing an employee */}
            {editEmployee && (
                <div>
                    <h2>Edit Employee</h2>
                    <div style={styles.form}>
                        <input
                            type="text"
                            placeholder="Username"
                            value={editEmployee.username}
                            onChange={(e) => setEditEmployee({ ...editEmployee, username: e.target.value })}
                            style={styles.input}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={editEmployee.email}
                            onChange={(e) => setEditEmployee({ ...editEmployee, email: e.target.value })}
                            style={styles.input}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={editEmployee.password}
                            onChange={(e) => setEditEmployee({ ...editEmployee, password: e.target.value })}
                            style={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="Role"
                            value={editEmployee.role}
                            onChange={(e) => setEditEmployee({ ...editEmployee, role: e.target.value })}
                            style={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="Emergency Contact"
                            value={editEmployee.emergencyContact}
                            onChange={(e) => setEditEmployee({ ...editEmployee, emergencyContact: e.target.value })}
                            style={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="Working Experience"
                            value={editEmployee.workingExp}
                            onChange={(e) => setEditEmployee({ ...editEmployee, workingExp: e.target.value })}
                            style={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="Gender"
                            value={editEmployee.gender}
                            onChange={(e) => setEditEmployee({ ...editEmployee, gender: e.target.value })}
                            style={styles.input}
                        />
                        <button
                            type="button"
                            onClick={handleUpdateEmployee}
                            style={styles.button}
                            onMouseOver={(e) => handleMouseOver(e, styles.buttonHover)}
                            onMouseOut={(e) => handleMouseOut(e, styles.button)}
                            onFocus={(e) => handleMouseOver(e, styles.buttonHover)}
                            onBlur={(e) => handleMouseOut(e, styles.button)}
                        >
                            Update
                        </button>
                        <button
                            type="button"
                            onClick={() => setEditEmployee(null)}
                            style={styles.button}
                            onMouseOver={(e) => handleMouseOver(e, styles.buttonHover)}
                            onMouseOut={(e) => handleMouseOut(e, styles.button)}
                            onFocus={(e) => handleMouseOver(e, styles.buttonHover)}
                            onBlur={(e) => handleMouseOut(e, styles.button)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
