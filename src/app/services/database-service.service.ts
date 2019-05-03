import { Attendance } from './../interfaces/Iattendance';
import { Students } from './../interfaces/Istudent';
import { Class } from './../interfaces/Iclass';
import { Teacher } from './../interfaces/Iteacher';
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { Course } from '../interfaces/Icourse';

@Injectable({
  providedIn: 'root'
})
export class DatabaseServiceService {
  teachersCollection: AngularFirestoreCollection<Teacher>;
  teacherDoc: AngularFirestoreDocument<Teacher>;
  teacher: Observable<Teacher>;

  coursesCollection: AngularFirestoreCollection<Course>;
  courseDoc: AngularFirestoreDocument<Course>;
  course: Observable<Course>;

  
  
  classesCollection: AngularFirestoreCollection<Class>;
  classes: Observable<Class[]>;
  classDoc: AngularFirestoreDocument<Class>;
  class: Observable<Class>;
  
  studentsCollection: AngularFirestoreCollection<Students>;
  students: Observable<Students[]>;

  constructor(
    public afs: AngularFirestore

  ) {

    this.classesCollection = this.afs.collection('Classes');
    this.classes = this.classesCollection.valueChanges();

    this.teachersCollection = this.afs.collection('Teachers');

    this.coursesCollection = this.afs.collection('CoursesTeachers');

    this.studentsCollection = this.afs.collection('Students');




  }


  markAttendaceInDb(attendance: Attendance): Promise<any> {
    console.log("in mark attendance in db",attendance)
    return new Promise((res, rej) => {
      this.afs.doc(`Attendance/${attendance.studentId}`).get().toPromise().then((attedance) => {
       
        console.log("23", attedance.data());
       
        let semesterId = "Semester-".concat(attendance.semesterId);
        let objToSend = {};
        
        let semesterAttendance = new Array();
        semesterAttendance=attedance.data()[semesterId];
        console.log(1,semesterAttendance)
        console.log("#90 semid",semesterId);
        console.log("#90 attendance",attedance.data()[semesterId]);
        
        attedance.data()[semesterId].forEach((element,index) => {

          if (element[attendance.courseId]){
            if(element[attendance.courseId].length > 0){
              console.log(2,element);
              let attendanceOfCourse: any[] = new Array();
              attendanceOfCourse = element[attendance.courseId];
              console.log(4,attendanceOfCourse);
              attendanceOfCourse.push(attendance);
              console.log(5,attendanceOfCourse);
              let obj = {};
              obj[attendance.courseId] = attendanceOfCourse;
              console.log(6,obj);

              semesterAttendance[index]=obj;
              objToSend[semesterId]=semesterAttendance;
              console.log(semesterAttendance);
              this.afs.collection('Attendance').doc(attendance.studentId)
                .update(objToSend).then((e) => { res(e) }).catch(e => { rej(e) });
  
            }else{
              console.log(3,element);
            let attendanceOfCourse: Attendance[] = new Array();
            attendanceOfCourse.push(attendance);

            let obj = {};
            obj[attendance.courseId] = attendanceOfCourse;
            console.log(obj);
            semesterAttendance[index]=obj;
            objToSend[semesterId]=semesterAttendance;
            console.log(semesterAttendance);
            return this.afs.collection('Attendance').doc(`${attendance.studentId}`)
              .update(objToSend).then((e) => { res(e) }).catch(e => { rej(e) });
            
            }
          } 
        });
      });
    });
  }



  getClassById(id: string) {

    this.classDoc = this.afs.doc<Class>(`Classes/${id}`);
    this.class = this.classDoc.valueChanges();
    return this.class;
  }


  getTeacher(id: string) {

    this.teacherDoc = this.afs.doc<Teacher>(`Teachers/${id}`);
    this.teacher = this.teacherDoc.valueChanges();
    return this.teacher;
  }



  getCourseById(id){
    this.courseDoc = this.afs.doc<Course>(`Courses/${id}`);
    this.course = this.courseDoc.valueChanges();
    return this.course;

  }


  getStudentsByClass(classId: string) {
    // return new Promise((res,rej)=>{
    this.studentsCollection = this.afs.collection('Students', ref => ref.where('class', '==', classId));
    this.students = this.studentsCollection.valueChanges();
    return (this.students);
    // })
  }

}
