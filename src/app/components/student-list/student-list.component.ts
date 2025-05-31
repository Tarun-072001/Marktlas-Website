import { Component, OnInit } from '@angular/core';
import { Student, StudentService } from '../../Service\'s/student.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  filteredStudents: Student[] = [];
  searchTerm = '';

  constructor(
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getStudents().subscribe(data => {
      this.students = data;
      this.filteredStudents = [...this.students];
    });
  }

  filterStudents() {
    if (!this.searchTerm) {
      this.filteredStudents = [...this.students];
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredStudents = this.students.filter(student => 
      student.fullName.toLowerCase().includes(term) || 
      student.id.toString().includes(term)
    );
  }

  viewStudent(id: number) {
    this.router.navigate(['/student-details', id]);
  }
}