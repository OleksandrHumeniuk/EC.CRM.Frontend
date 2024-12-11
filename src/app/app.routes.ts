import { Route } from '@angular/router';

import { LoginComponent } from './templates/login/login.component';
import { RequestComponent } from './templates/request/request.component';
import { StudentsComponent } from './templates/students/students.component';
import { FindMentorComponent } from './templates/find-mentor/find-mentor.component';
import { CreateStudentComponent } from "./templates/create-student/create-student.component";
import { EditStudentComponent } from "./templates/edit-student/edit-student.component";
import { authGuard } from './guards/auth.guard';
import { UserRoleType } from './types/user';

export type AppRouteData = {
  roles?: UserRoleType[],
};

export type AppRoute = Route & {
  data?: AppRouteData
};

export const routes: AppRoute[] = [
  {path: '', component: RequestComponent},
  {path: 'login', component: LoginComponent},
  {
    path: 'students',
    component: StudentsComponent,
    canActivate: [authGuard],
    data: {roles: ['Director', 'Mentor']}
  },
  {
    path: 'create-student',
    component: CreateStudentComponent,
    canActivate: [authGuard],
    data: {roles: ['Director', 'Mentor']}
  },
  {
    path: 'edit-student/:id',
    component: EditStudentComponent,
    canActivate: [authGuard],
    data: {roles: ['Director', 'Mentor']}
  },
  {
    path: 'find-mentor/:id',
    component: FindMentorComponent,
    canActivate: [authGuard],
    data: {roles: ['Director']}
  },
  {path: '**', redirectTo: ''},
];
