package com.example.hrms.payroll;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.hrms.common.UserService;
import com.example.hrms.common.Users;
import com.example.hrms.hr.EmployeeSalary;
import com.example.hrms.hr.EmployeeSalaryRepository;

@Service
public class PayrollService {

    @Autowired
    private UserService userService;

    @Autowired
    private EmployeeSalaryRepository employeeSalaryRepository;

    @Autowired
    private PayslipRepository payslipRepository;

    // Constants for contribution percentages
    private static final double EPF_EMPLOYER_CONTRIBUTION_RATE = 0.13;
    private static final double EPF_EMPLOYEE_CONTRIBUTION_RATE = 0.11;
    private static final double SOCSO_EMPLOYER_CONTRIBUTION_RATE = 0.018;
    private static final double SOCSO_EMPLOYEE_CONTRIBUTION_RATE = 0.005;
    private static final double EIS_EMPLOYER_CONTRIBUTION_RATE = 0.002;
    private static final double EIS_EMPLOYEE_CONTRIBUTION_RATE = 0.002;
    private static final double ANNUAL_TAX_EMPLOYER_RATE = 0.0;
    private static final double ANNUAL_TAX_EMPLOYEE_RATE = 0.00416;

    public Payslip generatePayslip(Long userId) {
        Users user = userService.getUserById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        EmployeeSalary salary = employeeSalaryRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("Salary information not found"));

        Double basicSalary = salary.getMonthlyGrossSalary();

        // Calculate contributions
        double epfEmployerContribution = basicSalary * EPF_EMPLOYER_CONTRIBUTION_RATE;
        double epfEmployeeContribution = basicSalary * EPF_EMPLOYEE_CONTRIBUTION_RATE;
        double socsoEmployerContribution = basicSalary * SOCSO_EMPLOYER_CONTRIBUTION_RATE;
        double socsoEmployeeContribution = basicSalary * SOCSO_EMPLOYEE_CONTRIBUTION_RATE;
        double eisEmployerContribution = basicSalary * EIS_EMPLOYER_CONTRIBUTION_RATE;
        double eisEmployeeContribution = basicSalary * EIS_EMPLOYEE_CONTRIBUTION_RATE;
        double annualTaxEmployer = basicSalary * ANNUAL_TAX_EMPLOYER_RATE;
        double annualTaxEmployee = basicSalary * ANNUAL_TAX_EMPLOYEE_RATE;

        // Create and save payslip
        Payslip payslip = new Payslip();
        payslip.setEmployeeId(userId);
        payslip.setBasicSalary(basicSalary);
        payslip.setEpfEmployerContribution(epfEmployerContribution);
        payslip.setEpfEmployeeContribution(epfEmployeeContribution);
        payslip.setSocsoEmployerContribution(socsoEmployerContribution);
        payslip.setSocsoEmployeeContribution(socsoEmployeeContribution);
        payslip.setEisEmployerContribution(eisEmployerContribution);
        payslip.setEisEmployeeContribution(eisEmployeeContribution);
        payslip.setAnnualTaxEmployer(annualTaxEmployer);
        payslip.setAnnualTaxEmployee(annualTaxEmployee);
        payslip.setPayslipDate(LocalDate.now());

        return payslipRepository.save(payslip);
    }
}
