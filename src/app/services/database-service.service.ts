import { Students } from './../interfaces/Istudent';
import { Class } from './../interfaces/Iclass';
import { Teacher } from './../interfaces/Iteacher';
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { toBase64String } from '@angular/compiler/src/output/source_map';

@Injectable({
  providedIn: 'root'
})
export class DatabaseServiceService {
  teachersCollection: AngularFirestoreCollection<Teacher>;
  teacherDoc: AngularFirestoreDocument<Teacher>;
  teacher: Observable<Teacher>;


  classesCollection: AngularFirestoreCollection<Class>;
  classes: Observable<Class[]>;

  studentsCollection: AngularFirestoreCollection<Students>;
  students:Observable<Students[]>;

  constructor(
    public afs: AngularFirestore

  ) {

    this.classesCollection=this.afs.collection('Classes');
    this.classes=this.classesCollection.valueChanges();

    this.teachersCollection = this.afs.collection('Teachers');

    this.studentsCollection = this.afs.collection('Students');




  }

  getTeacher(id: string) {

    this.teacherDoc = this.afs.doc<Teacher>(`Teachers/${id}`);
    this.teacher = this.teacherDoc.valueChanges();
    return this.teacher;
  }


  getStudentsByClass(classId: string)
  {
    // return new Promise((res,rej)=>{
      this.studentsCollection=this.afs.collection('Students', ref => ref.where('class', '==', classId));
      this.students=this.studentsCollection.valueChanges();
      return(this.students);
    // })
  }

}
