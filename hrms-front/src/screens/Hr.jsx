import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserEdit, FaSave, FaPlusCircle, FaMoneyCheckAlt } from 'react-icons/fa';
import styled from 'styled-components';

// Styled Components for CSS
const Container = styled.div`
  padding: 2rem;
  background: #f4f4f4;
  min-height: 100vh;
`;

const Header = styled.h2`
  font-size: 2rem;
  color: #333;
  text-align: center;
  margin-bottom: 2rem;
`;

const FormSection = styled.div`
  margin-bottom: 2rem;
  padding: 1rem;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: #0056b3;
  }

  & svg {
    font-size: 1.2rem;
  }
`;

const Hr = () => {
    // State for Employee Details
    const [employee, setEmployee] = useState({
        position: '',
        monthlyGrossSalary: '',
        annualLeave: '',
        medicalLeave: '',
        unpaidLeave: '',
        maternityLeave: '',
        userId: ''
    });

    // State for Payslip Details
    const [payslip, setPayslip] = useState({
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

    // Fetch Employee Details when userId changes
    useEffect(() => {
        if (employee.userId) {
            getEmployee(employee.userId);
        }
    }, [employee.userId]);

    // Handle Employee Form Input Changes
    const handleEmployeeChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    };

    // Handle Payslip Form Input Changes
    const handlePayslipChange = (e) => {
        setPayslip({ ...payslip, [e.target.name]: e.target.value });
    };

    // Create New Employee Profile
    const createEmployee = async () => {
        try {
            await axios.post('/api/employees', employee);
            alert('Employee profile created!');
        } catch (error) {
            console.error('Error creating employee:', error);
        }
    };

    // Retrieve Employee Profile
    const getEmployee = async (id) => {
        try {
            const response = await axios.get(`/api/employees/${id}`);
            setEmployee(response.data);
        } catch (error) {
            console.error('Error retrieving employee:', error);
        }
    };

    // Update Employee Profile
    const updateEmployee = async (id) => {
        try {
            await axios.put(`/api/employees/${id}`, employee);
            alert('Employee profile updated!');
        } catch (error) {
            console.error('Error updating employee:', error);
        }
    };

    // Create New Payslip
    const createPayslip = async () => {
        try {
            await axios.post('/api/payslips', payslip);
            alert('Payslip created!');
        } catch (error) {
            console.error('Error creating payslip:', error);
        }
    };

    return (
        <Container>
            <Header>HR Management</Header>

            {/* Employee Form */}
            <FormSection>
                <FormTitle>Employee Profile <FaUserEdit /></FormTitle>
                <Input type="text" name="position" placeholder="Position" value={employee.position} onChange={handleEmployeeChange} />
                <Input type="number" name="monthlyGrossSalary" placeholder="Monthly Gross Salary" value={employee.monthlyGrossSalary} onChange={handleEmployeeChange} />
                <Input type="number" name="annualLeave" placeholder="Annual Leave" value={employee.annualLeave} onChange={handleEmployeeChange} />
                <Input type="number" name="medicalLeave" placeholder="Medical Leave" value={employee.medicalLeave} onChange={handleEmployeeChange} />
                <Input type="number" name="unpaidLeave" placeholder="Unpaid Leave" value={employee.unpaidLeave} onChange={handleEmployeeChange} />
                <Input type="number" name="maternityLeave" placeholder="Maternity Leave" value={employee.maternityLeave} onChange={handleEmployeeChange} />
                <Input type="number" name="userId" placeholder="User ID" value={employee.userId} onChange={handleEmployeeChange} />
                <Button onClick={createEmployee}><FaPlusCircle /> Create Employee</Button>
                <Button onClick={() => updateEmployee(employee.userId)}><FaSave /> Update Employee</Button>
            </FormSection>

            {/* Payslip Form */}
            <FormSection>
                <FormTitle>Payslip Details <FaMoneyCheckAlt /></FormTitle>
                <Input type="number" name="employeeId" placeholder="Employee ID" value={payslip.employeeId} onChange={handlePayslipChange} />
                <Input type="number" name="basicSalary" placeholder="Basic Salary" value={payslip.basicSalary} onChange={handlePayslipChange} />
                <Input type="number" name="epfEmployerContribution" placeholder="EPF Employer Contribution" value={payslip.epfEmployerContribution} onChange={handlePayslipChange} />
                <Input type="number" name="epfEmployeeContribution" placeholder="EPF Employee Contribution" value={payslip.epfEmployeeContribution} onChange={handlePayslipChange} />
                <Input type="number" name="socsoEmployerContribution" placeholder="SOCSO Employer Contribution" value={payslip.socsoEmployerContribution} onChange={handlePayslipChange} />
                <Input type="number" name="socsoEmployeeContribution" placeholder="SOCSO Employee Contribution" value={payslip.socsoEmployeeContribution} onChange={handlePayslipChange} />
                <Input type="number" name="eisEmployerContribution" placeholder="EIS Employer Contribution" value={payslip.eisEmployerContribution} onChange={handlePayslipChange} />
                <Input type="number" name="eisEmployeeContribution" placeholder="EIS Employee Contribution" value={payslip.eisEmployeeContribution} onChange={handlePayslipChange} />
                <Input type="number" name="annualTaxEmployer" placeholder="Annual Tax Employer" value={payslip.annualTaxEmployer} onChange={handlePayslipChange} />
                <Input type="number" name="annualTaxEmployee" placeholder="Annual Tax Employee" value={payslip.annualTaxEmployee} onChange={handlePayslipChange} />
                <Input type="date" name="payslipDate" value={payslip.payslipDate} onChange={handlePayslipChange} />
                <Button onClick={createPayslip}><FaPlusCircle /> Create Payslip</Button>
            </FormSection>
        </Container>
    );
};

export default Hr;
