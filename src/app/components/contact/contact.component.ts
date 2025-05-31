import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contactForm!: FormGroup;
  captchaText!: string;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Initialize the contactForm
    this.contactForm = this.fb.group({
      fullname: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      service: ['', Validators.required],
      message: ['', Validators.required],
      captcha: ['', Validators.required]
    });

    this.reloadCaptcha(); // Generate CAPTCHA on component load
  }

  // Generate new CAPTCHA text
  reloadCaptcha(): void {
    const randomString = Math.random().toString(36).substring(2, 8).toUpperCase();
    this.captchaText = randomString;
  }

  // Form submission logic
  onSubmit(): void {
    if (this.contactForm.valid) {
      const enteredCaptcha = this.contactForm.value.captcha.toUpperCase();

      if (enteredCaptcha !== this.captchaText) {
        alert('Invalid CAPTCHA. Please try again.');
        this.reloadCaptcha();
        return;
      }

      // Store the contact form data in localStorage
      const contactData = {
        fullname: this.contactForm.value.fullname,
        mobile: this.contactForm.value.mobile,
        email: this.contactForm.value.email,
        service: this.contactForm.value.service,
        message: this.contactForm.value.message
      };

      localStorage.setItem('contactData', JSON.stringify(contactData));
      alert('Your message has been sent!');
      this.contactForm.reset();
      this.reloadCaptcha();  // Reload CAPTCHA after form submission
    }
  }  



  
}
