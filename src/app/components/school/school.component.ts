import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-school',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css']
})
export class SchoolComponent {
  selectedFeature: any = null;

  features = [
    {
      title: 'Cloud Solutions',
      image: 'https://cdn.pixabay.com/photo/2017/09/09/09/17/problem-2731501_1280.jpg',
      description: 'We provide scalable cloud services for enterprise growth.'
    },
    {
      title: 'AI Development',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d',
      description: 'AI-powered automation and decision systems tailored for businesses.'
    },
    {
      title: 'Cybersecurity',
      image: 'https://cdn.pixabay.com/photo/2023/05/26/06/54/ai-generated-8018867_1280.png',
      description: 'End-to-end protection for enterprise IT infrastructure and data.'
    },
    {
      title: 'Web Development',
      image: 'https://cdn.pixabay.com/photo/2020/05/25/17/13/mockup-5219534_1280.jpg',
      description: 'Web Development = Turning ideas into websites/apps using: Frontend (HTML/CSS/JS) • Backend (Servers/Databases) • Full-Stack (Both). Why? ✔️ Build anything ✔️ High-demand career ✔️ Creative+Logical balance. Start: ① Learn HTML/CSS → ② Add JavaScript → ③ Pick framework (React/Node) → ④ Build projects! 🚀'
    }
  ];

  openModal(feature: any) {
    this.selectedFeature = feature;
  }

  closeModal() {
    this.selectedFeature = null;
  }
}
