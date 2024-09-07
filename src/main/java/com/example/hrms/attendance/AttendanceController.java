package com.example.hrms.attendance;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    @PostMapping("/checkin/{userId}")
    public ResponseEntity<Attendance> checkIn(@PathVariable Long userId) {
        Attendance attendance = attendanceService.checkIn(userId);
        return ResponseEntity.ok(attendance);
    }

    @PostMapping("/checkout/{userId}")
    public ResponseEntity<Attendance> checkOut(@PathVariable Long userId) {
        Attendance attendance = attendanceService.checkOut(userId);
        return ResponseEntity.ok(attendance);
    }

    @GetMapping("/records/{userId}")
    public ResponseEntity<List<Attendance>> getAttendanceByUserId(@PathVariable Long userId) {
        List<Attendance> attendanceRecords = attendanceService.getAttendanceByUserId(userId);
        return ResponseEntity.ok(attendanceRecords);
    }
}
