package com.example.hrms.attendance;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.hrms.common.UserService;
import com.example.hrms.common.Users;

@Service
public class AttendanceService {

    @Autowired
    private UserService userService;

    @Autowired
    private AttendanceRepository attendanceRepository;

    public Attendance checkIn(Long userId) {
        Users user = userService.getUserById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        Attendance attendance = new Attendance();
        attendance.setUser(user);
        attendance.setCheckInTime(LocalDateTime.now());

        return attendanceRepository.save(attendance);
    }

    public Attendance checkOut(Long userId) {
        Users user = userService.getUserById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        // Fetch the last attendance record for the user
        List<Attendance> attendances = attendanceRepository.findByUserId(userId);
        if (attendances.isEmpty()) {
            throw new RuntimeException("No check-in record found");
        }

        Attendance lastAttendance = attendances.get(attendances.size() - 1);
        lastAttendance.setCheckOutTime(LocalDateTime.now());

        return attendanceRepository.save(lastAttendance);
    }

    public List<Attendance> getAttendanceByUserId(Long userId) {
        return attendanceRepository.findByUserId(userId);
    }
}
