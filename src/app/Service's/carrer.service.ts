// src/app/services/carrer.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Application {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    address?: string;
    linkedin?: string;
    github?: string;
  };
  positionDetails: {
    jobTitle: string;
    source?: string;
    workAuth: string;
    visa: string;
  };
  education: {
    degree: string;
    field: string;
    institution: string;
    gradYear: number;
    certifications?: string;
  };
  workExperience: Array<{
    company: string;
    jobTitle: string;
    duration: string;
    technologies: string;
    responsibilities: string;
  }>;
  additionalInfo: {
    resumeFileName: string;
    relocate: string;
    salary?: number;
  };
  declaration: {
    certify: boolean;
    consent: boolean;
  };
}

@Injectable({
  providedIn: 'root'
})
export class CarrerService {
  private apiUrl = 'http://localhost:3000/applications';

  constructor(private http: HttpClient) {}

  submitApplication(application: Application): Observable<Application> {
    return this.http.post<Application>(this.apiUrl, application);
  }

  getApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(this.apiUrl);
  }
}