import { AuthServiceService } from './../services/auth-service.service';
import { DatabaseServiceService } from './../services/database-service.service';
import { Teacher } from './../interfaces/Iteacher';
import { Component, OnInit } from '@angular/core';
import { Students } from '../interfaces/Istudent';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {

  teacher: Teacher;
  students: Students[];
  constructor(public router: Router,public actRoute: ActivatedRoute, public dbs: DatabaseServiceService, public authS: AuthServiceService) {
    let teacherId = this.actRoute.snapshot.paramMap.get('id');

    this.dbs.getTeacher(teacherId).subscribe((teacher) => { this.teacher = teacher; console.log(teacher) });
 
    // this.dbs.getStudentsByClass('BSCS-2015-Morning-A').then((students) => { this.students = students }).catch((e) => { alert(e.message) });
  }



  showTeaching() {
    this.teacher.nowTeaching.forEach((teaching) => {
      console.log(teaching);
    })
  }



  selectTeaching(teaching:any)
  {
    
    this.router.navigate(['/attendance',teaching.calss,teaching.course]);
  }


  showStudents() {
    this.students.forEach((stuents) => {
      console.log(stuents);
    })
  }


}
