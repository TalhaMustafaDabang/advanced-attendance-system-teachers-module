import { AttendanceComponent } from './attendance/attendance.component';
import { LandingComponent } from './landing/landing.component';
import { AuthguardServiceService } from './services/authguard-service.service';
import { NgModule } from '@angular/core';
import { Routes, Router } from '@angular/router';
import { HomePage } from './home/home.page';
import { LoginComponent } from './login/login.component';
import { ListPage } from './list/list.page';

export const routes: Routes =
[

{
    path:'landing/:id',
    component: LandingComponent ,
    canActivate: [AuthguardServiceService],
},
{
    path:'sign-in',
    component: LoginComponent ,
},
{
    path:'attendance/:calssId/:courseId',
    component: AttendanceComponent,
    canActivate: [AuthguardServiceService],
},
{
    path: 'h',
    component: HomePage ,
    // canActivate: [AuthguardServiceService],
},
{
    path: '',
    component: LandingComponent ,
    canActivate: [AuthguardServiceService],
},
{
    path: '**', redirectTo: 'landing',
    canActivate: [AuthguardServiceService],
},
]
