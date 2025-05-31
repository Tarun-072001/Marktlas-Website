// src/app/components/job-apply/job-apply.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Application, CarrerService } from '../../Service\'s/carrer.service';


@Component({
  selector: 'app-job-apply',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './job-apply.component.html',
  styleUrls: ['./job-apply.component.css']
})
export class JobApplyComponent {
  formData: Application = {
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      linkedin: '',
      github: ''
    },
    positionDetails: {
      jobTitle: '',
      source: '',
      workAuth: '',
      visa: ''
    },
    education: {
      degree: '',
      field: '',
      institution: '',
      gradYear: 0,
      certifications: ''
    },
    workExperience: [{
      company: '',
      jobTitle: '',
      duration: '',
      technologies: '',
      responsibilities: ''
    }],
    additionalInfo: {
      resumeFileName: '',
      relocate: ''
    },
    declaration: {
      certify: false,
      consent: false
    }
  };

  resumeFile: File | null = null;
  isSubmitting = false;
  submitSuccess = false;

  constructor(private careerService: CarrerService) {}

  addWorkExperience() {
    this.formData.workExperience.push({
      company: '',
      jobTitle: '',
      duration: '',
      technologies: '',
      responsibilities: ''
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (file.type === 'application/pdf') {
        this.resumeFile = file;
        this.formData.additionalInfo.resumeFileName = file.name;
      } else {
        alert('Please upload a PDF file for your resume.');
      }
    }
  }

  submitForm() {
    if (this.validateForm()) {
      this.isSubmitting = true;
      
      this.careerService.submitApplication(this.formData).subscribe({
        next: () => {
          this.submitSuccess = true;
          this.isSubmitting = false;
          this.resetForm();
        },
        error: (error) => {
          console.error('Error submitting application:', error);
          alert('There was an error submitting your application. Please try again.');
          this.isSubmitting = false;
        }
      });
    }
  }

  private validateForm(): boolean {
    if (!this.formData.personalInfo.fullName ||
        !this.formData.personalInfo.email ||
        !this.formData.personalInfo.phone ||
        !this.formData.positionDetails.jobTitle ||
        !this.formData.positionDetails.workAuth ||
        !this.formData.positionDetails.visa ||
        !this.formData.education.degree ||
        !this.formData.education.field ||
        !this.formData.education.institution ||
        !this.formData.education.gradYear ||
        !this.formData.additionalInfo.resumeFileName ||
        !this.formData.declaration.certify ||
        !this.formData.declaration.consent) {
      alert('Please fill all required fields.');
      return false;
    }
    return true;
  }

  private resetForm() {
    this.formData = {
      personalInfo: {
        fullName: '',
        email: '',
        phone: '',
        address: '',
        linkedin: '',
        github: ''
      },
      positionDetails: {
        jobTitle: '',
        source: '',
        workAuth: '',
        visa: ''
      },
      education: {
        degree: '',
        field: '',
        institution: '',
        gradYear: 0,
        certifications: ''
      },
      workExperience: [{
        company: '',
        jobTitle: '',
        duration: '',
        technologies: '',
        responsibilities: ''
      }],
      additionalInfo: {
        resumeFileName: '',
        relocate: ''
      },
      declaration: {
        certify: false,
        consent: false
      }
    };
    this.resumeFile = null;
  }
}