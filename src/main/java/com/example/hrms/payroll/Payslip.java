package com.example.hrms.payroll;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "payslips")
public class Payslip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "employee_id", nullable = false)
    private Long employeeId;

    @Column(name = "basic_salary", nullable = false)
    private Double basicSalary;

    @Column(name = "epf_employer_contribution", nullable = false)
    private Double epfEmployerContribution;

    @Column(name = "epf_employee_contribution", nullable = false)
    private Double epfEmployeeContribution;

    @Column(name = "socso_employer_contribution", nullable = false)
    private Double socsoEmployerContribution;

    @Column(name = "socso_employee_contribution", nullable = false)
    private Double socsoEmployeeContribution;

    @Column(name = "eis_employer_contribution", nullable = false)
    private Double eisEmployerContribution;

    @Column(name = "eis_employee_contribution", nullable = false)
    private Double eisEmployeeContribution;

    @Column(name = "annual_tax_employer", nullable = false)
    private Double annualTaxEmployer;

    @Column(name = "annual_tax_employee", nullable = false)
    private Double annualTaxEmployee;

    @Column(name = "payslip_date", nullable = false)
    private LocalDate payslipDate;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public Double getBasicSalary() {
        return basicSalary;
    }

    public void setBasicSalary(Double basicSalary) {
        this.basicSalary = basicSalary;
    }

    public Double getEpfEmployerContribution() {
        return epfEmployerContribution;
    }

    public void setEpfEmployerContribution(Double epfEmployerContribution) {
        this.epfEmployerContribution = epfEmployerContribution;
    }

    public Double getEpfEmployeeContribution() {
        return epfEmployeeContribution;
    }

    public void setEpfEmployeeContribution(Double epfEmployeeContribution) {
        this.epfEmployeeContribution = epfEmployeeContribution;
    }

    public Double getSocsoEmployerContribution() {
        return socsoEmployerContribution;
    }

    public void setSocsoEmployerContribution(Double socsoEmployerContribution) {
        this.socsoEmployerContribution = socsoEmployerContribution;
    }

    public Double getSocsoEmployeeContribution() {
        return socsoEmployeeContribution;
    }

    public void setSocsoEmployeeContribution(Double socsoEmployeeContribution) {
        this.socsoEmployeeContribution = socsoEmployeeContribution;
    }

    public Double getEisEmployerContribution() {
        return eisEmployerContribution;
    }

    public void setEisEmployerContribution(Double eisEmployerContribution) {
        this.eisEmployerContribution = eisEmployerContribution;
    }

    public Double getEisEmployeeContribution() {
        return eisEmployeeContribution;
    }

    public void setEisEmployeeContribution(Double eisEmployeeContribution) {
        this.eisEmployeeContribution = eisEmployeeContribution;
    }

    public Double getAnnualTaxEmployer() {
        return annualTaxEmployer;
    }

    public void setAnnualTaxEmployer(Double annualTaxEmployer) {
        this.annualTaxEmployer = annualTaxEmployer;
    }

    public Double getAnnualTaxEmployee() {
        return annualTaxEmployee;
    }

    public void setAnnualTaxEmployee(Double annualTaxEmployee) {
        this.annualTaxEmployee = annualTaxEmployee;
    }

    public LocalDate getPayslipDate() {
        return payslipDate;
    }

    public void setPayslipDate(LocalDate payslipDate) {
        this.payslipDate = payslipDate;
    }
}
