import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StudentService, Student } from '../../Service\'s/student.service';

interface Course {
  name: string;
  fee: number;
}

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  studentForm: FormGroup;
  showPaymentFields = false;
  selectedCourseFee = 0;
  totalStudents = 0;

  qualifications = [
    'High School',
    'Intermediate',
    'Diploma',
    'Bachelor\'s Degree',
    'Master\'s Degree',
    'PhD'
  ];

  courses: Course[] = [
    { name: 'Web Development', fee: 10000 },
    { name: 'Angular Full Stack', fee: 15000 },
    { name: 'MERN Stack', fee: 18000 },
    { name: 'Frontend Development', fee: 12000 },
    { name: 'ReactJS Development', fee: 14000 }
  ];

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private router: Router
  ) {
    this.studentForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      address: ['', Validators.required],
      highestQualification: ['', Validators.required],
      course: ['', Validators.required],
      joinType: ['', Validators.required],
      mode: ['', Validators.required],
      paymentMode: [''],
      paymentAmount: ['']
    });
  }

  ngOnInit() {
    this.loadTotalStudents();
  }

  loadTotalStudents() {
    this.studentService.getStudents().subscribe(students => {
      this.totalStudents = students.length;
    });
  }

  togglePaymentFields() {
    const joinType = this.studentForm.get('joinType')?.value;
    this.showPaymentFields = joinType === 'Join';

    if (this.showPaymentFields) {
      this.studentForm.get('paymentMode')?.setValidators([Validators.required]);
      this.studentForm.get('paymentAmount')?.setValidators([Validators.required]);
      this.studentForm.get('paymentAmount')?.setValue(this.selectedCourseFee);
    } else {
      this.studentForm.get('paymentMode')?.clearValidators();
      this.studentForm.get('paymentAmount')?.clearValidators();
      this.studentForm.get('paymentAmount')?.setValue('');
    }

    this.studentForm.get('paymentMode')?.updateValueAndValidity();
    this.studentForm.get('paymentAmount')?.updateValueAndValidity();
  }

  updateCourseFee() {
    const selectedCourse = this.studentForm.get('course')?.value;
    const course = this.courses.find(c => c.name === selectedCourse);
    this.selectedCourseFee = course ? course.fee : 0;

    if (this.showPaymentFields) {
      this.studentForm.get('paymentAmount')?.setValue(this.selectedCourseFee);
    }
  }

  submitForm() {
    if (this.studentForm.valid) {
      const formData = this.studentForm.value;
      const student: Student = {
        id: this.totalStudents + 1,
        fullName: formData.fullName,
        email: formData.email,
        mobile: formData.mobile,
        address: formData.address,
        highestQualification: formData.highestQualification,
        course: formData.course,
        courseFee: this.selectedCourseFee,
        joinType: formData.joinType,
        mode: formData.mode,
        paymentMode: formData.paymentMode,
        paymentAmount: formData.paymentAmount || 0,
        registrationDate: new Date().toISOString()
      };

      this.studentService.addStudent(student).subscribe(() => {
        alert(`Registration Successful! Your ID: ${student.id}`);
        this.studentForm.reset();
        this.loadTotalStudents();
      });
    }
  }
}
