package com.example.hrms.hr;

import com.example.hrms.common.Users;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "employees_salary")
public class EmployeeSalary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String position;

    @Column(name = "monthly_gross_salary", nullable = false)
    private Double monthlyGrossSalary;

    @Column(name = "annual_leave")
    private Integer annualLeave;

    @Column(name = "medical_leave")
    private Integer medicalLeave;

    @Column(name = "unpaid_leave")
    private Integer unpaidLeave;

    @Column(name = "maternity_leave")
    private Integer maternityLeave;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public Double getMonthlyGrossSalary() {
        return monthlyGrossSalary;
    }

    public void setMonthlyGrossSalary(Double monthlyGrossSalary) {
        this.monthlyGrossSalary = monthlyGrossSalary;
    }

    public Integer getAnnualLeave() {
        return annualLeave;
    }

    public void setAnnualLeave(Integer annualLeave) {
        this.annualLeave = annualLeave;
    }

    public Integer getMedicalLeave() {
        return medicalLeave;
    }

    public void setMedicalLeave(Integer medicalLeave) {
        this.medicalLeave = medicalLeave;
    }

    public Integer getUnpaidLeave() {
        return unpaidLeave;
    }

    public void setUnpaidLeave(Integer unpaidLeave) {
        this.unpaidLeave = unpaidLeave;
    }

    public Integer getMaternityLeave() {
        return maternityLeave;
    }

    public void setMaternityLeave(Integer maternityLeave) {
        this.maternityLeave = maternityLeave;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }
}
