import { Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { DevelopmentComponent } from './components/development/development.component';
import { HomeComponent } from './components/home/home.component';
import { FeatureComponent } from './components/feature/feature.component';
import { WebsiteComponent } from './components/website/website.component';
import { OnlineclassComponent } from './components/onlineclass/onlineclass.component';
import { DevelopmentWebComponent } from './components/development-web/development-web.component';
import { ApplicationComponent } from './components/application/application.component';
import { SchoolComponent } from './components/school/school.component';
import { MarketingComponent } from './components/marketing/marketing.component';
import { EcommerceComponent } from './components/ecommerce/ecommerce.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { CarrersComponent } from './components/carrers/carrers.component';
import { JobApplyComponent } from './components/job-apply/job-apply.component';




export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'development', component: DevelopmentComponent },
  { path: 'Feature', component: FeatureComponent },
  { path: 'Contact', component: ContactComponent },
  { path: 'Website', component: WebsiteComponent },
  { path: 'Online-Class', component: OnlineclassComponent },
  { path: 'DevelopmentWeb', component: DevelopmentWebComponent },
  { path: 'Application', component: ApplicationComponent },
  { path: 'School', component: SchoolComponent },
  { path: 'Marketing', component: MarketingComponent },
  { path: 'Ecommerce', component: EcommerceComponent },
  { path: 'registrationform', component: RegistrationFormComponent },
  { path: 'student-list', component: StudentListComponent },

  {path:'carrers', component:CarrersComponent},
  {
    path:'job-apply', component:JobApplyComponent
  },
  {
    path:'application-list', component:ApplicationComponent
  },
  // {
  //   path:'student-list', component:StudentListComponent
  // }

];

