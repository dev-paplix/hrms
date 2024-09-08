// Payroll.jsx
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FaDollarSign, FaPlusCircle, FaSave, FaEdit, FaTrashAlt } from 'react-icons/fa';
import './Payroll.css'; // Custom CSS for styling

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
                            <FaSave /> Save Changes
                        </button>
                    ) : (
                        <button type="button" onClick={createPayslip}>
                            <FaPlusCircle /> Create Payslip
                        </button>
                    )}
                    <button type="button" onClick={clearForm}>
                        <FaEdit /> Clear Form
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
                                        <FaEdit /> Edit
                                    </button>
                                    <button type="button" onClick={() => deletePayslip(payslip.id)}>
                                        <FaTrashAlt /> Delete
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
