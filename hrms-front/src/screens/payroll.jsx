// Payroll.jsx
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FaDollarSign, FaPlusCircle, FaSave, FaEdit, FaTrashAlt } from 'react-icons/fa';

const Payroll = () => {
    // State for Payslips
    const [payslips, setPayslips] = useState([]);
    const [payslip, setPayslip] = useState({
        id: '',
        employeeId: '',
        basicSalary: '',
        epfEmployerContribution: '',
        epfEmployeeContribution: '',
        socsoEmployerContribution: '',
        socsoEmployeeContribution: '',
        eisEmployerContribution: '',
        eisEmployeeContribution: '',
        annualTaxEmployer: '',
        annualTaxEmployee: '',
        payslipDate: ''
    });
    const [editMode, setEditMode] = useState(false);

    // Handle Input Changes
    const handleChange = (e) => {
        setPayslip({ ...payslip, [e.target.name]: e.target.value });
    };

    // Fetch Payslips
    const getPayslips = useCallback(async () => {
        try {
            const response = await axios.get('/api/payslips');
            setPayslips(response.data);
        } catch (error) {
            console.error('Error fetching payslips:', error);
        }
    }, []);

    // Create Payslip
    const createPayslip = useCallback(async () => {
        try {
            await axios.post('/api/payslips', payslip);
            alert('Payslip created successfully!');
            clearForm();
            getPayslips();
        } catch (error) {
            console.error('Error creating payslip:', error);
        }
    }, [payslip, getPayslips]);

    // Update Payslip
    const updatePayslip = useCallback(async (id) => {
        try {
            await axios.put(`/api/payslips/${id}`, payslip);
            alert('Payslip updated successfully!');
            clearForm();
            setEditMode(false);
            getPayslips();
        } catch (error) {
            console.error('Error updating payslip:', error);
        }
    }, [payslip, getPayslips]);

    // Delete Payslip
    const deletePayslip = useCallback(async (id) => {
        try {
            await axios.delete(`/api/payslips/${id}`);
            alert('Payslip deleted successfully!');
            getPayslips();
        } catch (error) {
            console.error('Error deleting payslip:', error);
        }
    }, [getPayslips]);

    // Load Payslip into Form for Editing
    const editPayslip = (payslip) => {
        setPayslip(payslip);
        setEditMode(true);
    };

    // Clear Form
    const clearForm = () => {
        setPayslip({
            id: '',
            employeeId: '',
            basicSalary: '',
            epfEmployerContribution: '',
            epfEmployeeContribution: '',
            socsoEmployerContribution: '',
            socsoEmployeeContribution: '',
            eisEmployerContribution: '',
            eisEmployeeContribution: '',
            annualTaxEmployer: '',
            annualTaxEmployee: '',
            payslipDate: ''
        });
    };

    // Keyboard Shortcut for Save
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                editMode ? updatePayslip(payslip.id) : createPayslip();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [editMode, payslip.id, createPayslip, updatePayslip]);

    // Fetch Payslips on Component Mount
    useEffect(() => {
        getPayslips();
    }, [getPayslips]);

    return (
        <div className="payroll-container">
            {/* Inline CSS Styles */}
            <style>
                {`
                    .payroll-container {
                        padding: 20px;
                        max-width: 800px;
                        margin: 0 auto;
                        font-family: Arial, sans-serif;
                        background-color: #f9f9f9;
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0,0,0,0.1);
                    }
                    .payroll-container h2 {
                        text-align: center;
                        margin-bottom: 20px;
                        color: #333;
                    }
                    .payroll-form input {
                        padding: 10px;
                        margin: 5px 0;
                        border: 1px solid #ccc;
                        border-radius: 4px;
                        width: 100%;
                        box-sizing: border-box;
                        font-size: 14px;
                    }
                    .button-group {
                        margin-top: 10px;
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                    }
                    .button-group button {
                        padding: 10px 15px;
                        margin-right: 10px;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                        display: inline-flex;
                        align-items: center;
                        font-size: 14px;
                        color: white;
                        background-color: #28a745;
                        transition: background-color 0.3s ease;
                    }
                    .button-group button:hover {
                        background-color: #218838;
                    }
                    .button-group button:last-child {
                        background-color: #6c757d;
                    }
                    .button-group button:last-child:hover {
                        background-color: #5a6268;
                    }
                    .payroll-list {
                        margin-top: 30px;
                    }
                    .payroll-list h3 {
                        margin-bottom: 15px;
                        color: #333;
                    }
                    .payroll-list ul {
                        list-style: none;
                        padding: 0;
                    }
                    .payroll-list li {
                        background-color: white;
                        padding: 15px;
                        margin-bottom: 10px;
                        border: 1px solid #ccc;
                        border-radius: 4px;
                        display: flex;
                        flex-direction: column;
                        box-shadow: 0 0 5px rgba(0,0,0,0.05);
                    }
                    .payroll-list li span {
                        margin-bottom: 5px;
                        font-size: 14px;
                        color: #555;
                    }
                    .actions {
                        margin-top: 10px;
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                    }
                    .actions button {
                        padding: 8px 12px;
                        margin-right: 10px;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                        display: inline-flex;
                        align-items: center;
                        font-size: 14px;
                        color: white;
                        background-color: #007bff;
                        transition: background-color 0.3s ease;
                    }
                    .actions button:hover {
                        background-color: #0056b3;
                    }
                    .actions button:last-child {
                        background-color: #dc3545;
                    }
                    .actions button:last-child:hover {
                        background-color: #c82333;
                    }
                `}
            </style>

            <h2>Payroll Management <FaDollarSign /></h2>

            {/* Payslip Form */}
            <div className="payroll-form">
                <input
                    type="text"
                    name="employeeId"
                    placeholder="Employee ID"
                    value={payslip.employeeId}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="basicSalary"
                    placeholder="Basic Salary"
                    value={payslip.basicSalary}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="epfEmployerContribution"
                    placeholder="EPF Employer Contribution"
                    value={payslip.epfEmployerContribution}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="epfEmployeeContribution"
                    placeholder="EPF Employee Contribution"
                    value={payslip.epfEmployeeContribution}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="socsoEmployerContribution"
                    placeholder="SOCSO Employer Contribution"
                    value={payslip.socsoEmployerContribution}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="socsoEmployeeContribution"
                    placeholder="SOCSO Employee Contribution"
                    value={payslip.socsoEmployeeContribution}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="eisEmployerContribution"
                    placeholder="EIS Employer Contribution"
                    value={payslip.eisEmployerContribution}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="eisEmployeeContribution"
                    placeholder="EIS Employee Contribution"
                    value={payslip.eisEmployeeContribution}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="annualTaxEmployer"
                    placeholder="Annual Tax Employer"
                    value={payslip.annualTaxEmployer}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="annualTaxEmployee"
                    placeholder="Annual Tax Employee"
                    value={payslip.annualTaxEmployee}
                    onChange={handleChange}
                    required
                />
                <input
                    type="date"
                    name="payslipDate"
                    placeholder="Payslip Date"
                    value={payslip.payslipDate}
                    onChange={handleChange}
                    required
                />
                <div className="button-group">
                    {editMode ? (
                        <button type="button" onClick={() => updatePayslip(payslip.id)}>
                            <FaSave style={{ marginRight: '5px' }} /> Save Changes
                        </button>
                    ) : (
                        <button type="button" onClick={createPayslip}>
                            <FaPlusCircle style={{ marginRight: '5px' }} /> Create Payslip
                        </button>
                    )}
                    <button type="button" onClick={clearForm}>
                        <FaEdit style={{ marginRight: '5px' }} /> Clear Form
                    </button>
                </div>
            </div>

            {/* Payslip List */}
            <div className="payroll-list">
                <h3>Existing Payslips</h3>
                {payslips.length > 0 ? (
                    <ul>
                        {payslips.map((payslip) => (
                            <li key={payslip.id}>
                                <span><strong>Employee ID:</strong> {payslip.employeeId}</span>
                                <span><strong>Basic Salary:</strong> {payslip.basicSalary}</span>
                                <span><strong>EPF Employer Contribution:</strong> {payslip.epfEmployerContribution}</span>
                                <span><strong>EPF Employee Contribution:</strong> {payslip.epfEmployeeContribution}</span>
                                <span><strong>SOCSO Employer Contribution:</strong> {payslip.socsoEmployerContribution}</span>
                                <span><strong>SOCSO Employee Contribution:</strong> {payslip.socsoEmployeeContribution}</span>
                                <span><strong>EIS Employer Contribution:</strong> {payslip.eisEmployerContribution}</span>
                                <span><strong>EIS Employee Contribution:</strong> {payslip.eisEmployeeContribution}</span>
                                <span><strong>Annual Tax Employer:</strong> {payslip.annualTaxEmployer}</span>
                                <span><strong>Annual Tax Employee:</strong> {payslip.annualTaxEmployee}</span>
                                <span><strong>Payslip Date:</strong> {payslip.payslipDate}</span>
                                <div className="actions">
                                    <button type="button" onClick={() => editPayslip(payslip)}>
                                        <FaEdit style={{ marginRight: '5px' }} /> Edit
                                    </button>
                                    <button type="button" onClick={() => deletePayslip(payslip.id)}>
                                        <FaTrashAlt style={{ marginRight: '5px' }} /> Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No payslips available.</p>
                )}
            </div>
        </div>
    );
};

export default Payroll;
