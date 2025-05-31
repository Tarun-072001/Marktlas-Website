import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-development-web',
  imports: [CommonModule,
    FormsModule
  ],
  templateUrl: './development-web.component.html',
  styleUrl: './development-web.component.css'
})
export class DevelopmentWebComponent {
  showModal = false;
  modalTitle = '';
  modalContent = '';

  openModal(title: string, content: string) {
    this.modalTitle = title;
    this.modalContent = content;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }



  name = '';
  mobile = '';
  email = '';
  message = '';
  captchaInput = '';
  generatedCaptcha = '';

  ngOnInit(): void {
    this.generateCaptcha();
  }

  generateCaptcha(): void {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    this.generatedCaptcha = '';
    for (let i = 0; i < 5; i++) {
      this.generatedCaptcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  }

  submitForm(): void {
    console.log(this.name);
    if (!this.name || !this.mobile || !this.email || !this.message || !this.captchaInput) {
      alert('Please fill in all fields including CAPTCHA.');
      return;
    }

    if (this.captchaInput !== this.generatedCaptcha) {
      alert('Incorrect CAPTCHA. Please try again.');
      this.generateCaptcha();
      return;
    }

    const formData = {
      name: this.name,
      mobile: this.mobile,
      email: this.email,
      message: this.message
    };

    localStorage.setItem('contactData', JSON.stringify(formData));
    alert('Form submitted successfully!');

    this.name = '';
    this.mobile = '';
    this.email = '';
    this.message = '';
    this.captchaInput = '';
    this.generateCaptcha();
  }
}
