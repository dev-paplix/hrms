package com.example.hrms.payroll;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/payroll")
public class PayrollController {

    @Autowired
    private PayrollService payrollService;

    @PostMapping("/generatePayslip/{userId}")
    public ResponseEntity<Payslip> generatePayslip(@PathVariable Long userId) {
        Payslip payslip = payrollService.generatePayslip(userId);
        return ResponseEntity.ok(payslip);
    }
}
