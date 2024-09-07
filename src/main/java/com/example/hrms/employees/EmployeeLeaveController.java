package com.example.hrms.employees;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.hrms.common.UserService;
import com.example.hrms.common.Users;

@RestController
@RequestMapping("/api/leave")
public class EmployeeLeaveController {

    @Autowired
    private EmployeeLeaveService employeeLeaveService;

    @Autowired
    private UserService userService;

    /**
     * Applies for or updates a leave request.
     *
     * @param leave The leave application details.
     * @return Response entity with status and leave application details.
     */
    @PostMapping("/apply")
    public ResponseEntity<EmployeeLeave> applyForLeave(@RequestBody EmployeeLeave leave) {
        try {
            // Ensure the user exists and is set correctly in the leave object
            Optional<Users> user = userService.getUserById(leave.getUser().getId());
            if (user.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(null);
            }
            leave.setUser(user.get());
            EmployeeLeave savedLeave = employeeLeaveService.saveOrUpdateLeave(leave);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedLeave);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    /**
     * Retrieves all leave applications.
     *
     * @return Response entity with status and list of leave applications.
     */
    @GetMapping
    public ResponseEntity<List<EmployeeLeave>> getAllLeaves() {
        List<EmployeeLeave> leaves = employeeLeaveService.getAllLeaves();
        return ResponseEntity.ok(leaves);
    }

    /**
     * Retrieves a leave application by its ID.
     *
     * @param id The ID of the leave application.
     * @return Response entity with status and leave application details.
     */
    @GetMapping("/{id}")
    public ResponseEntity<EmployeeLeave> getLeaveById(@PathVariable Long id) {
        Optional<EmployeeLeave> leave = employeeLeaveService.getLeaveById(id);
        return leave.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    /**
     * Deletes a leave application by its ID.
     *
     * @param id The ID of the leave application to be deleted.
     * @return Response entity with status.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLeave(@PathVariable Long id) {
        try {
            employeeLeaveService.deleteLeave(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
