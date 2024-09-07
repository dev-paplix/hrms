package com.example.hrms.employees;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.hrms.common.UserService;
import com.example.hrms.common.Users;

@Service
public class EmployeeLeaveService {

    @Autowired
    private EmployeeLeaveRepository employeeLeaveRepository;

    @Autowired
    private UserService userService;

    /**
     * Saves or updates a leave application.
     *
     * @param leave The leave object to be saved or updated.
     * @return The saved or updated leave object.
     */
    public EmployeeLeave saveOrUpdateLeave(EmployeeLeave leave) {
        // Ensure that the user is set correctly
        Optional<Users> user = userService.getUserById(leave.getUser().getId());
        if (user.isEmpty()) {
            throw new RuntimeException("User not found with ID: " + leave.getUser().getId());
        }
        leave.setUser(user.get());
        return employeeLeaveRepository.save(leave);
    }

    /**
     * Retrieves a leave application by its ID.
     *
     * @param id The ID of the leave application.
     * @return The leave application, if found.
     */
    public Optional<EmployeeLeave> getLeaveById(Long id) {
        return employeeLeaveRepository.findById(id);
    }

    /**
     * Deletes a leave application by its ID.
     *
     * @param id The ID of the leave application to be deleted.
     */
    public void deleteLeave(Long id) {
        employeeLeaveRepository.deleteById(id);
    }

    /**
     * Retrieves all leave applications.
     *
     * @return A list of all leave applications.
     */
    public List<EmployeeLeave> getAllLeaves() {
        return employeeLeaveRepository.findAll();
    }
}
