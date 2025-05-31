import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-carrers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './carrers.component.html',
  styleUrl: './carrers.component.css'
})
export class CarrersComponent {
  webDevJobs = [
    { title: 'Frontend Developer (Angular)', count: 2, exp: '1–3 Years(Exp)' },
    { title: 'Backend Developer (Node.js)', count: 1, exp: '2–4 Years(Exp)' },
    { title: 'Full Stack Developer', count: 2, exp: '2–5 Years(Exp)' },
    { title: 'UI/UX Designer', count: 1, exp: '1–3 Years(Exp)' },
    { title: 'Web Designer (HTML/CSS)', count: 1, exp: '0.6–2 Years(Exp)' },
    { title: 'Software Tester (Manual/Automation)', count: 1, exp: '1–3 Years(Exp)' }
  ];
}
