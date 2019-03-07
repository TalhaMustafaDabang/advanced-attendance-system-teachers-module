import { Attendance } from './../interfaces/Iattendance';
import { Students } from './../interfaces/Istudent';
import { DatabaseServiceService } from './../services/database-service.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements AfterViewInit, OnInit {
  manual: boolean = false;
  option = "Manual";
  students: Students[];
  clsId: string;
  courseId: string;
  attendance;
  @ViewChild('player') player: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('captureBtn') captureBtn: ElementRef;
  @ViewChild('imagePickerArea') imagePickerArea: ElementRef;

  constructor(public fireStorage: AngularFireStorage, public actRoute: ActivatedRoute, public dbs: DatabaseServiceService) {

    this.clsId = actRoute.snapshot.paramMap.get('calssId');
    this.courseId = actRoute.snapshot.paramMap.get('courseId');
    this.dbs.getStudentsByClass(this.clsId)
      .subscribe((students) => {
        this.students = students;
        this.attendance = new Array<Attendance>();
        this.students.forEach((student) => {
          let attendance: Attendance = {
            teacher: "",
            status: false,
            date: new Date().toUTCString(),
            studentId: student.enrollmentId,
          };
          this.attendance.push(attendance);
        });
        console.log(students);
        console.log(this.attendance);
      });

  }


  markAttendance(enrolId: any, i) {

      console.log(`${enrolId} is present! ${i}`);
      this.attendance[i].status = true;

  }



  markAutoAttendance(faceListIds:any[])
  {
    faceListIds.forEach((element)=>{
      let i = this.attendance.findIndex(x => x.enrollmentId == element.id);
      this.attendance[i].status = true;
    });
  }








  submitAttendance() {
    console.log(this.attendance);
  }

  capturePic() {
    this.player.nativeElement.style.display = "none";
    // this.captureBtn.nativeElement.style.display="none";
    this.canvas.nativeElement.style.display = "block";
    let context = this.canvas.nativeElement.getContext('2d');
    context.drawImage(this.player.nativeElement, 0, 0, this.canvas.nativeElement.width,
      this.player.nativeElement.videoHeight / (this.player.nativeElement.videoWidth / this.canvas.nativeElement.width)
    );
    let file = this.dataURItoBlob(this.canvas.nativeElement.toDataURL());
    console.log(this.attendance);



    let task = this.fireStorage.ref(`${this.clsId}/${this.courseId}/${new Date().toUTCString()}`)
      .put(file)
      .then((file) => {

        task.finally(() => { file.ref.getDownloadURL().then((e) => { console.log(e) }) });

      })
      .catch((e) => {
        alert(e.message);
      })
    console.log(file);
  }



  dataURItoBlob(dataURI) {
    let byteString = atob(dataURI.split(',')[1]);
    let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    let ab = new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    let blob = new Blob([ab], { type: mimeString });
    return blob;
  }



  initializeMedia() {
    if (!('mediaDevices' in navigator)) {
    }
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        this.player.nativeElement.srcObject = stream;
      })
      .catch((e) => {
        alert(e.message);
        this.imagePickerArea.nativeElement.style.display = 'block';
      })
      ;
  }

  ngAfterViewInit() {
    this.initializeMedia();

  }

  ngOnInit() {
  }

  toggleOption() {
    console.log(this.manual, this.option);
    this.manual = !this.manual;
    this.manual != true ? this.option = "Manual" : this.option = "Automatic";


  }


}