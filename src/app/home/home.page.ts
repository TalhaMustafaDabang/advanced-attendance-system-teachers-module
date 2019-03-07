import { Students } from './../interfaces/Istudent';
import { Teacher } from './../interfaces/Iteacher';
import { AuthServiceService } from './../services/auth-service.service';
import { DatabaseServiceService } from './../services/database-service.service';
import { Component } from '@angular/core';
import * as faceapi from 'face-api.js';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  teacher: Teacher;
  students: Students[];
  constructor(public dbs:DatabaseServiceService,public authS: AuthServiceService)
  {

    this.dbs.getTeacher('bilal@gmail.com').subscribe((teacher)=>{this.teacher=teacher;console.log(teacher)});
    // this.dbs.getStudentsByClass('BSCS-2015-Morning-A').then((students)=>{this.students=students}).catch((e)=>{alert(e.message)});    
  }



  showTeaching(){
    this.teacher.nowTeaching.forEach((teaching)=>{
      console.log(teaching);
    })
  }


  showStudents(){
    this.students.forEach((stuents)=>{console.log(stuents);
    })
  }


}
