import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FaPlusCircle, FaSave, FaTrash } from 'react-icons/fa';
import styled from 'styled-components';

// Styled Components for CSS
const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const FormSection = styled.div`
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ButtonGroup = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  & svg {
    margin-right: 5px;
  }
`;

const DepartmentList = styled.div`
  margin-top: 20px;
`;

const ListItem = styled.div`
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;

  & button {
    background-color: transparent;
    border: none;
    cursor: pointer;

    &:hover {
      color: #007bff;
    }
  }
`;

const Department = () => {
    const [department, setDepartment] = useState({
        name: '',
        location: '',
        manager: ''
    });

    const [departments, setDepartments] = useState([]);
    const [savedDepartment, setSavedDepartment] = useState(null); // Local state to simulate saving

    const handleChange = (e) => {
        setDepartment({ ...department, [e.target.name]: e.target.value });
    };

    const createDepartment = async () => {
        try {
            await axios.post('/api/departments', department);
            alert('Department created!');
            fetchDepartments();
        } catch (error) {
            console.error('Error creating department:', error);
        }
    };

    const fetchDepartments = useCallback(async () => {
        try {
            const response = await axios.get('/api/departments');
            setDepartments(response.data);
        } catch (error) {
            console.error('Error fetching departments:', error);
        }
    }, []);

    const deleteDepartment = async (id) => {
        try {
            await axios.delete(`/api/departments/${id}`);
            alert('Department deleted!');
            fetchDepartments();
        } catch (error) {
            console.error('Error deleting department:', error);
        }
    };

    const saveDepartment = () => {
        setSavedDepartment(department);
        alert('Department form saved locally.');
    };

    useEffect(() => {
        fetchDepartments();
    }, [fetchDepartments]);

    return (
        <Container>
            <h2>Department Management</h2>

            {/* Department Form */}
            <FormSection>
                <Input type="text" name="name" placeholder="Department Name" value={department.name} onChange={handleChange} />
                <Input type="text" name="location" placeholder="Location" value={department.location} onChange={handleChange} />
                <Input type="text" name="manager" placeholder="Manager" value={department.manager} onChange={handleChange} />
                <ButtonGroup>
                    <Button onClick={createDepartment}><FaPlusCircle /> Create Department</Button>
                    <Button onClick={saveDepartment}><FaSave /> Save Department</Button>
                </ButtonGroup>
            </FormSection>

            {savedDepartment && (
                <div>
                    <h4>Saved Department Data:</h4>
                    <p>Name: {savedDepartment.name}</p>
                    <p>Location: {savedDepartment.location}</p>
                    <p>Manager: {savedDepartment.manager}</p>
                </div>
            )}

            {/* Department List */}
            <DepartmentList>
                {departments.map(dept => (
                    <ListItem key={dept.id}>
                        <div>
                            <strong>{dept.name}</strong><br />
                            Location: {dept.location}<br />
                            Manager: {dept.manager}
                        </div>
                        <Actions>
                            <Button onClick={() => deleteDepartment(dept.id)}><FaTrash /> Delete</Button>
                        </Actions>
                    </ListItem>
                ))}
            </DepartmentList>
        </Container>
    );
};

export default Department;
